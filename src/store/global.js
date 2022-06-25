import { webAuthnServer } from "../boot/axios";
import {_postQueryServer} from "src/store/utils/helper";
import {
  base64UrlEncode,
  base64UrlDecode,
  printLog,
  formatFullName,
  getAuthConfig,
} from "./utils/base64";

// Amplify libraries
import { Auth } from "@aws-amplify/auth";



const state = {
  userData: {},
  cognitoUser: {},
  userId: "",
  sessionId: "",
  typeUser: "",
  locale: { label: "English (United States)", value: "en-US" },
};

const getters = {
  getUserData(state) {
    return state.userData;
  },
  getCognitoUser(state) {
    return state.cognitoUser;
  },
  getUserId(state) {
    return state.userId;
  },
  getSessionId(state) {
    return state.sessionId;
  },
  getTypeUser(state) {
    return state.typeUser;
  },
};

const mutations = {
  setUserData(state, userData) {
    state.userData = userData;
  },
  setCognitoUser(state, cognitoUser) {
    state.cognitoUser = cognitoUser;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  setSessionId(state, sessionId) {
    state.sessionId = sessionId;
  },

  setTypeUser(state, typeUser) {
    state.typeUser = typeUser;
    localStorage.setItem("typeUser", typeUser);
    Auth.configure(getAuthConfig(typeUser));
    printLog(`Storage modified with typeUser ${typeUser}`);
  },
};

const actions = {
  async setTypeUser({ commit, state }, typeUser) {
    printLog(
      `In actions.setTypeUser state.typeUser = ${state.typeUser}. New value = ${typeUser}`
    );
    if (!["client", "hacker"].includes(typeUser)) {
      throw new Error(`Invalid type user in actions.setTypeUser : ${typeUser}`);
    }
    commit("setTypeUser", typeUser);
    printLog(`setTypeUser executed with typeUser ${typeUser}`);
    return typeUser;
  },

  getTypeUser({ commit, state }) {
    let s = getters.getTypeUser(state);
    if (s) {
      return s;
    } else {
      // typeUser is not in the state.
      // Get it in localstorage or fix default value
      if (localStorage.getItem("typeUser")) {
        s = localStorage.getItem("typeUser");
      } else {
        s = "client";
      }
      // And put in local storage and state
      s = actions.setTypeUser({ commit, state }, s);
      return s;
    }
  },

  async loadUserData({ commit, state }) {
    const typeUser = actions.getTypeUser({ commit, state });
    printLog("loadUserData, typeUser = ", typeUser);
    try {
      let userData = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      printLog(`user data =`, userData);
      commit("setUserData", userData);
    } catch (error) {
      printLog(
        `Error in loadUserData. Maybe User is not logged in (Error message = ${error.message})`
      );
      commit("setUserData", null);
    }
  },

  async onSubmitSignUpForm({ commit, state }, payload) {
    printLog("onSubmitSignUpForm payload", payload);
    // Configure user pool options (userPool ID, identityPoolId, etc)
    commit("setTypeUser", "client");

    const userAttr = {
      name: formatFullName(payload.fullName),
      email: payload.email.trim(),
      locale: state.locale.value,
      "custom:companyName": payload.companyName.trim(),
      "custom:title": payload.title.trim(),
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };

    const userData = {
      email: payload.email,
      username: payload.email,
      password: "fakePassword@12345",
      attributes: userAttr,
    };

    try {
      const cognitoUser = await Auth.signUp(userData);

      printLog("Auth.signUp SUCCESSFULL");
      printLog("Cognito user", cognitoUser);

      // Set userData with payload
      commit("setUserData", userData);

      // Set also cognitoUser
      commit("setCognitoUser", cognitoUser);
      return cognitoUser.codeDeliveryDetails;
    } catch (error) {
      printLog("Error in Auth.signUp", error);
      throw new Error(error);
    }
  },

  async onSubmitSignUpFormHacker({ commit }, payload) {
    printLog("onSubmitSignUpFormHacker payload", payload);
    // Configure user pool options (userPool ID, identityPoolId, etc)
    commit("setTypeUser", "hacker");

    const userAttr = {
      email: payload.email.trim(),
      preferred_username: payload.username.trim(),
      locale: state.locale.value,
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };

    const userData = {
      username: payload.username.trim(),
      password: "fakePassword@12345",
      attributes: userAttr,
    };
    try {
      const cognitoUser = await Auth.signUp(userData);
      printLog("Auth.signUp Hacker SUCCESSFULL");
      printLog("Cognito user", cognitoUser);

      // Set userData with payload
      commit("setUserData", userData);

      // Set also cognitoUser
      commit("setCognitoUser", cognitoUser);
      return cognitoUser.codeDeliveryDetails;
    } catch (error) {
      printLog("Error in Auth.signUp", error);
      throw new Error(error);
    }
  },

  async onSubmitValidationCode({ state }, code) {
    printLog(`Code = ${code}`);
    /**
     * User confirm signUp in cognito user pool
     */
    const userData = getters.getUserData(state);
    printLog(`userData`, userData);
    try {
      const status = await Auth.confirmSignUp(userData.username, code);
      // User is confirmed.
      printLog(`Auth.confirmSignUp status = ${status}`);
      return "Cognito account created.";
    } catch (error) {
      printLog(`Error in Auth.confirmSignUp`, error);
      throw new Error(error);
    }
  },

  async getCredentialOptions({ commit, state }) {
    const userData = getters.getUserData(state);
    const typeUser = getters.getTypeUser(state);
    // Get credential options
    const url = "/attestation/options";
    let params = {};

    if (typeUser === "client") {
      params = {
        username: userData.email,
        displayName: userData.attributes.name,
        typeUser,
      };
    } else if (typeUser === "hacker") {
      params = {
        username: userData.attributes.email,
        displayName: userData.username,
        typeUser,
      };
    } else {
      throw new Error(
        "Incorrect typeUser in getCredentialOptions : " + typeUser
      );
    }

    try {
      const result = await _queryServer(url, params);
      printLog(`Response from ${url}`, result);

      // CredentialOptions
      const credentialOptions = { ...result };
      delete credentialOptions.serverResponse;
      delete credentialOptions.sessionId;
      _removeEmpty(credentialOptions);

      // Set userId and sessionId
      commit("setUserId", result.user.id);
      commit("setSessionId", result.sessionId);

      // Logs
      printLog("SESSION ID = " + result.sessionId);
      printLog("USER ID = " + result.user.id);
      printLog(`Credential options available !`);

      return credentialOptions;
    } catch (error) {
      // a simple message is returned
      printLog(`Request to ${url} failed`, error);
      throw new Error(error);
    }
  },

  async callAuthenticator({ state }, credOptions) {
    // deep copy object
    const credentialOptions = JSON.parse(JSON.stringify(credOptions));

    credentialOptions.user.id = base64UrlDecode(credentialOptions.user.id);
    credentialOptions.challenge = base64UrlDecode(credentialOptions.challenge);

    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    try {
      const rawAttestation = await navigator.credentials.create({
        publicKey: credentialOptions,
        signal: abortSignal,
      });
      printLog("rawAttestation", rawAttestation);

      let attestation = {
        rawId: base64UrlEncode(rawAttestation.rawId),
        id: base64UrlEncode(rawAttestation.rawId),
        response: {
          clientDataJSON: base64UrlEncode(
            rawAttestation.response.clientDataJSON
          ),
          attestationObject: base64UrlEncode(
            rawAttestation.response.attestationObject
          ),
        },
        type: rawAttestation.type,
      };

      if (rawAttestation.getClientExtensionResults) {
        attestation.extensions = rawAttestation.getClientExtensionResults();
      }

      // set transports if it is available
      if (typeof rawAttestation.response.getTransports === "function") {
        attestation.response.transports =
          rawAttestation.response.getTransports();
      }

      printLog(
        `Public key with key ID ${attestation.id} generated for user ${credentialOptions.user.name}`
      );
      return attestation;
    } catch (error) {
      printLog(`Error when creating credentials`, error);
      throw new Error(error);
    }
  },

  async sendAttestationResult({ state, dispatch }, attestation) {
    const url = "/attestation/result";
    const params = {
      sessionId: getters.getSessionId(state),
      requestOrigin: "front",
      typeUser: getters.getTypeUser(state),
      ...attestation,
    };
    try {
      const response = await _queryServer(url, params);
      printLog("Public Key Credential", response);

      dispatch('strapiClientSignUp',getters.getUserData(state))
      return getters.getUserData(state);
    } catch (error) {
      printLog(`Error when parsing credentials`, error);
      throw new Error(error);
    }
  },
  async strapiSignIn({state},loggedUser){
    try {
      const url="/custom/signin";
      let c = new FormData();
      c.append('token',loggedUser);
      const data = await _postQueryServer(url,c);
      console.log("La valeur de data dans = "+ data);
      return data;
    }catch (e) {
      console.log(`Erreur dans strapiClientSignUp ${e}`);
    }
  },

  async strapiClientSignUp({state},userData){
    try {
      const url="/custom/signup-client";
      let c = new FormData();
      let strapiUser={
        username:userData.username,
        email:userData.email,
        provider:"local",
        password:"",
        confirm:true,
        blocked:false,

        companyName:userData.attributes['custom:companyName'],
        fullName:userData.attributes['custom:name'],
        title:userData.attributes['custom:title']
      }
      c.append('strapiUser',JSON.stringify(strapiUser));
      const data = await _postQueryServer(url,c);
      console.log("La valeur de data dans = "+ data);
      return data;
    }catch (e) {
      console.log(`Erreur dans strapiClientSignUp ${e}`);
    }
  },
  async strapiHackerSignUp({state},userData){
    try {
      const url="/custom/signup-hacker";
      let c = new FormData();
      let strapiUser={
        username:userData.username,
        email:userData.email,
        provider:"local",
        password:"",
        confirm:true,
        blocked:false,
      }
      c.append('strapiUser',JSON.stringify(strapiUser));
      const data = await _postQueryServer(url,c);
      console.log("La valeur de data dans = "+ data);
      return data;
    }catch (e) {
      console.log(`Erreur dans strapiClientSignUp ${e}`);
    }
  },
  async onSubmitLoginForm({ commit }, payload) {
    printLog(`Inside onSubmitLoginForm function. Params=`, payload);
    /**
     * https://docs.amplify.aws/lib/auth/switch-auth/q/platform/js/#customauth-flow
     */
    // Auth.configure(getAuthConfig());

    try {
      const cognitoUser = await Auth.signIn(payload.email);
      printLog("SignIn result. User=", cognitoUser);
      if (cognitoUser.challengeName === "CUSTOM_CHALLENGE") {
        return cognitoUser;
      } else {
        printLog(`Unknown challenge name ${cognitoUser.challengeName}`);
        throw new Error(`Unknown challenge name ${cognitoUser.challengeName}`);
      }
    } catch (error) {
      printLog(`Unable to sign in`, error);
      throw new Error(error);
    }
  },

  async getCredentialInNavigator({ state, commit }, signInOptions) {
    //param user moved
    printLog(`Inside getCredentialInNavigator function`);
    if (!signInOptions) {
      return `Sign in options unavailable. Exit`;
    }
    printLog(
      "signInOptions before navigator.credentials.get are : ",
      signInOptions
    );

    try {
      const rawAttestation = await navigator.credentials.get({
        publicKey: signInOptions,
      });
      printLog(
        "signInOptions after navigator.credentials.get are : ",
        signInOptions
      );
      printLog("rawAttestation=", rawAttestation);

      /**
       * prepare credentials challenge response
       */
      let customChallengeAnswer = {};
      if (rawAttestation.response) {
        // rawId, id and type
        const id = rawAttestation.id;
        const type = rawAttestation.type;

        // Le reste des infos
        const clientDataJSON = base64UrlEncode(
          rawAttestation.response.clientDataJSON
        );
        const authenticatorData = base64UrlEncode(
          rawAttestation.response.authenticatorData
        );
        const signature = base64UrlEncode(rawAttestation.response.signature);
        const userHandle = base64UrlEncode(rawAttestation.response.userHandle);

        customChallengeAnswer.response = {
          requestOrigin: "front",
          type: type,
          id: id,
          clientDataJSON: clientDataJSON,
          authenticatorData: authenticatorData,
          signature: signature,
          userHandle: userHandle,
        };
        printLog("customChallengeAnswer", customChallengeAnswer);
        return customChallengeAnswer;
      } else {
        printLog(`Unable to retrieve credential response`, rawAttestation);
        return Promise.reject(`Unable to retrieve credential response`);
      }
    } catch (error) {
      printLog(`Error in getCredentialInNavigator`, error);
      throw new Error(error);
    }
  },

  async sendChallengeResult({ commit, state, dispatch }, payload) {
    try {
      // to send the answer of the custom challenge
      let customChallengeAnswer = JSON.stringify(payload.customChallengeAnswer);
      let user = payload.user;

      /* customChallengeAnswer = JSON.stringify(customChallengeAnswer); */
      const loggedUser = await Auth.sendCustomChallengeAnswer(
        user,
        customChallengeAnswer
      );
      printLog("User is logged in. loggedUser=", loggedUser);
      commit("setUserData", loggedUser);

      //Login with strapi
      dispatch('strapiSignIn',loggedUser);

      return loggedUser;
    } catch (error) {
      printLog(`Error in sendChallengeResult`, error);
      throw new Error(error);
    }
  },

  async logoutUser({ commit }) {
    try {
      await Auth.signOut();
      commit("setUserData", null);
      return true;
    } catch (error) {
      printLog(`Error signing out = ${error.message}`);
      throw new Error(error);
    }
  },

  async resendConfirmationCode({ commit, state }) {
    const userData = getters.getUserData(state);
    printLog("resendConfirmationCode username = " + userData.username);
    try {
      await Auth.resendSignUp(userData.username);
      printLog("code resent successfully");
      return true;
    } catch (error) {
      printLog("error resending code: ", error);
      throw new Error(error);
    }
  },
};

//helper function
const _queryServer = async (path, payload = {}) => {
  printLog("************ QUERYING SERVER ***************");
  printLog("**** URL" + path);
  printLog("**** PARAMS", payload);
  try {
    const response = await webAuthnServer({
      mode: "cors",
      url: path,
      method: "POST",
      data: payload,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
    printLog("**** RESPONSE.DATA", response.data);
    if (response.data.status === "OK") {
      return response.data.data;
    } else {
      return response.data.message;
    }
  } catch (error) {
    printLog("**** ERROR.DATA", error);
    throw new Error(error);
  }
};

function _removeEmpty(obj) {
  for (let key in obj) {
    if (obj[key] == null || obj[key] === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      _removeEmpty(obj[key]);
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
