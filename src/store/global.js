import { webAuthnServer } from "../boot/axios";

// Amplify libraries
import { Auth } from "@aws-amplify/auth";
import { cognitoConfig } from "../../cognitoConfig";
Auth.configure(cognitoConfig);
const state = {
  userData: {},
  cognitoUser: {},
  userId: "",
  sessionId: "",
  credentialOptions: {},
  signInOptions: {},
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
  getSignInOptions(state) {
    return state.signInOptions;
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
  setSignInOptions(state, signInOptions) {
    state.signInOptions = signInOptions;
  },
};

const actions = {
  async onSubmitSignUpForm({ commit }, userData) {
    printLog("UserData", userData);

    if (!window.PublicKeyCredential) {
      return Promise.reject(
        `WebAuthn not supported in this navigator. See https://caniuse.com/?search=webauthn`
      );
    }
    /**
     * User initiate account creation to my-app.com
     * "Here is my fullName and email"
     *  POST /authn/signup/init
     */
    const userAttr = {
      name: userData.fullName,
      email: userData.email,
      locale: state.locale.value,
      "custom:companyName": userData.companyName,
      "custom:title": userData.title,
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

  async onSubmitValidationCode({ commit, state }, code) {
    printLog(`Code = ${code}`);
    /**
     * User confirm signUp in cognito user pool
     */
    const userData = getters.getUserData(state);
    try {
      const status = await Auth.confirmSignUp(userData.email, code);
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

  async callAuthenticator({ state }, credentialOptions) {
    if (!window.PublicKeyCredential) {
      return Promise.reject(
        `WebAuthn not supported in this navigator. See https://caniuse.com/?search=webauthn`
      );
    }

    printLog(`credentialOptions in callAuthenticator`, credentialOptions);
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
        `Public key with key ID ${attestation.id} generated for user ${
          getters.getUserData(state).email
        }`
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
    Auth.configure({
      authenticationFlowType: "CUSTOM_AUTH",
    });
    try {
      const user = await Auth.signIn(payload.email);
      printLog("SignIn result. User=", user);
      if (user.challengeName === "CUSTOM_CHALLENGE") {
        // Here generate options to call custom challenge
        // Extract challenge params
        const challenge = base64UrlDecode(user.challengeParam.challenge);
        const timeout = user.challengeParam.timeout;
        const rpId = user.challengeParam.rpId;
        // Allowed credentials is an Array
        const allowCredentials = JSON.parse(
          user.challengeParam.allowCredentials
        );
        printLog("allowCredentials=", allowCredentials);

        //Base64url decoding of id in allowCredentials
        if (allowCredentials instanceof Array) {
          for (let cred of allowCredentials) {
            if ("id" in cred) {
              cred.id = base64UrlDecode(cred.id);
            }
          }
        }
        // allowCredentials.id = base64UrlDecode(allowCredentials.id);
        const userVerification = user.challengeParam.userVerification;
        const extensions = JSON.parse(user.challengeParam.extensions);
        const sessionId = user.challengeParam.sessionId;
        // Call navigator.credential.create
        var signInOptions = {
          challenge: challenge, //challenge was generated and sent from CreateAuthChallenge lambda trigger
          rpId: rpId,
          allowCredentials: allowCredentials,
          timeout: timeout,
          userVerification: userVerification,
          extensions: extensions,
        };
        printLog("signInOptions", signInOptions);
        commit("setSignInOptions", signInOptions);
        commit("setCognitoUser", user);
        commit("setSessionId", sessionId);
        printLog(`End in 'onSubmitLoginForm'`);
        return user;
      } else {
        printLog(`Unknown challenge name ${user.challengeName}`);
        return Promise.reject(`Unknown challenge name ${user.challengeName}`);
      }
    } catch (error) {
      printLog(`Unable to sign in`, error);
      throw new Error(error);
    }
  },

  async getCredentialInNavigator({ state, commit }, user) {
    printLog(`Inside getCredentialInNavigator function`);
    //get sign in credentials from authenticator
    const signInOptions = getters.getSignInOptions(state);
    if (!signInOptions) {
      return `Sign in options unavailable. Exit`;
    }
    printLog("signInOptions are : ", signInOptions);

    try {
      const rawAttestation = await navigator.credentials.get({
        publicKey: signInOptions,
      });
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

        // to send the answer of the custom challenge
        customChallengeAnswer = JSON.stringify(customChallengeAnswer);
        const loggedUser = await Auth.sendCustomChallengeAnswer(
          user,
          customChallengeAnswer
        );
        printLog("User is logged in. loggedUser=", loggedUser);
        // User is logged in
        let newUser = {
          email:user.email,
          name:user.fullName,
          userId:2222
        }
        commit('setUserData',newUser);
        localStorage.setItem('user',JSON.stringify(newUser));
        //return "User is logged in";
        return newUser.userId
      } else {
        printLog(`Unable to retrieve credential response`, rawAttestation);
        return Promise.reject(`Unable to retrieve credential response`);
      }
    } catch (error) {
      printLog(`Error in getCredentialInNavigator`, error);
      throw new Error(error);
    }
  },

  async logoutUser() {
    try {
      await Auth.signOut();
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

/**
 * Base64 url encodes an array buffer
 * @param {ArrayBuffer} arrayBuffer
 */
const base64UrlEncode = (arrayBuffer) => {
  if (!arrayBuffer || arrayBuffer.length == 0) {
    return undefined;
  }

  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

/**
 * Base64 url decode
 * @param {String} base64url
 */
const base64UrlDecode = (base64url) => {
  let input = base64url.replace(/-/g, "+").replace(/_/g, "/");
  let diff = input.length % 4;
  if (!diff) {
    while (diff) {
      input += "=";
      diff--;
    }
  }
  let matob = atob(input);
  const val = Uint8Array.from(matob, (c) => c.charCodeAt(0));
  return val;
};

/**
 * Logs a object to console
 * @param {string} name object name
 * @param {string} object object
 */
function printLog(name, object) {
  if (isJSON(object)) {
    console.log(name + " --- " + JSON.stringify(object, null, 2));
  } else {
    console.log(name, object);
  }
}

function isJSON(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
