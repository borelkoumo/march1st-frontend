import { webAuthnServer } from "../boot/axios";
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
    if (!state.typeUser) {
      const s = localStorage.getItem("typeUser");
      if (!s) {
        return "client";
      } else {
        return s;
      }
    } else {
      return state.typeUser;
    }
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
    state.typUser = ["client", "hacker"].includes(typeUser)
      ? typeUser
      : "client";

    localStorage.setItem("typeUser", state.typUser);
    console.log(`Storage modified ${state.typUser}`);
    Auth.configure(getAuthConfig());
  },
};

const actions = {
  async onDefineUser({ commit }) {
    // Configure user pool options (userPool ID, identityPoolId, etc)
    let typeUser = localStorage.getItem("typeUser");
    printLog('ici, typeUser = ', typeUser)
    commit("setTypeUser", typeUser);

    try {
      let userData = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      printLog(userData);
      commit("setUserData", userData);
    } catch (error) {
      commit("setUserData", null);
    }
  },

  async onSubmitSignUpForm({ commit, state }, userData) {
    // Configure user pool options (userPool ID, identityPoolId, etc)
    commit("setTypeUser", "client");

    printLog("UserData", userData);
    const userAttr = {
      name: formatFullName(userData.fullName),
      email: userData.email.trim(),
      locale: state.locale.value,
      "custom:companyName": userData.companyName.trim(),
      "custom:title": userData.title.trim(),
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };
    try {
      const cognitoUser = await Auth.signUp({
        /* email: userData.email, */
        username: userData.email,
        password: "fakePassword@12345",
        attributes: userAttr,
      });
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

  async onSubmitSignUpFormHacker({ commit }, userData) {
    // Configure user pool options (userPool ID, identityPoolId, etc)
    commit("setTypeUser", "hacker");

    printLog("UserData-Hacker", userData);
    const userAttr = {
      email: userData.email.trim(),
      preferred_username: userData.username.trim(),
      locale: state.locale.value,
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };
    try {
      const cognitoUser = await Auth.signUp({
        username: userData.username.trim(),
        password: "fakePassword@12345",
        attributes: userAttr,
      });
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
    printLog(`Auth.Auth`, Auth.Auth);
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
    // Get credential options
    const url = "/attestation/options";
    const params = {
      username: userData.email,
      displayName: userData.fullName,
      typeUser: getters.getTypeUser(state),
    };
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

  async sendAttestationResult({ state }, attestation) {
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
      return getters.getUserData(state);
    } catch (error) {
      printLog(`Error when parsing credentials`, error);
      throw new Error(error);
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

  async sendChallengeResult({ commit, state }, payload) {
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
