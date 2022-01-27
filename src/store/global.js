import { webAuthnServer } from "../boot/axios";

// Amplify libraries
import { Auth } from "@aws-amplify/auth";
import { cognitoConfig } from "../../cognitoConfig";
import { Notify } from 'quasar';
Auth.configure(cognitoConfig);

const state = {
  userData: {},
  cognitoUser: {},
  userId: "",
  sessionId: "",
  credentialOptions: {},
  signInOptions: {},
  locale:{ label:"English (United States)", value:"en-US"}
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
     * "Here is my username and email"
     *  POST /authn/signup/init
     */
    const userAttr = {
      name: userData.fullName,
      email: userData.email,
      locale: state.locale.value,
      "custom:companyName" : userData.companyName,
      "custom:title" : userData.title,
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };
    try {
      const cognitoUser = await Auth.signUp({
        /* email: userData.email, */
        username:userData.email,
        password: "fakePassword@12345",
        attributes: userAttr,
      })
      printLog("Auth.signUp SUCCESSFULL");
      printLog("Cognito user", cognitoUser);

      // Set userData with payload
      commit("setUserData", userData);

      // Set also cognitoUser
      commit("setCognitoUser", cognitoUser);
      return cognitoUser.codeDeliveryDetails;
    } catch (error) {
        //printLog("Error in Auth.signUp");
        //printLog(error);
        //return error.name;
        Notify.create({
          message:error.message,
          type:'negative',
          position:"top",
          icon:"error"
        })
        return -1;
    }
    /* // Signup in Cognito
    return Auth.signUp({
      username:userData.email,
      password: "fakePassword@12345",
      attributes: userAttr,
    })

      .then((cognitoUser) => {
        printLog("Auth.signUp SUCCESSFULL");
        printLog("Cognito user", cognitoUser);

        // Set userData with payload
        commit("setUserData", userData);

        // Set also cognitoUser
        commit("setCognitoUser", cognitoUser);
        return Promise.resolve(cognitoUser.codeDeliveryDetails);
      })
      .catch((error) => {
        printLog("Error in Auth.signUp");
        printLog(error);
        return Promise.reject(error.name);
      }); */
  },

  onSubmitValidationCode({ commit, state }, code) {
    printLog(`Code = ${code}`);
    /**
     * User confirm signUp in cognito user pool
     */
    const userData = getters.getUserData(state);
    return Auth.confirmSignUp(userData.email, code)
      .then((status) => {
        // User is confirmed.
        printLog(`Auth.confirmSignUp status = ${status}`);

        // Get credential options
        const url = "/attestation/options";
        const params = {
          username: userData.email,
          displayName: userData.fullName,
        };
        return _queryServer(url, params)
          .then((result) => {
            printLog(`Response from ${url}`, result);

            // CredentialOptions
            const credentialOptions = { ...result };
            delete credentialOptions.serverResponse;
            delete credentialOptions.sessionId;
            _removeEmpty(credentialOptions);

            // Set also userId
            commit("setUserId", result.user.id);
            // Set also sessionId
            commit("setSessionId", result.sessionId);
            printLog("SESSION ID = " + result.sessionId);
            printLog("USER ID = " + result.user.id);
            printLog(`Cognito Account created !`);

            return Promise.resolve(credentialOptions);
          })
          .catch((e) => {
            // a simple message is returned
            printLog(`Request to ${url} failed : ${e}`);
            return Promise.reject(e);
          });
      })
      .catch((error) => {
        printLog(`Error in Auth.confirmSignUp : ${JSON.stringify(error)}`);
        return Promise.reject(error.name);
      });
  },

  callAuthenticator({ commit, state }, credentialOptions) {
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

    return navigator.credentials
      .create({
        publicKey: credentialOptions,
        signal: abortSignal,
      })
      .then((rawAttestation) => {
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

        const url = "/attestation/result";
        const params = {
          sessionId: getters.getSessionId(state),
          requestOrigin: "front",
          ...attestation,
        };
        return _queryServer(url, params)
          .then((response) => {
            printLog("Public Key Credential", response);
            return Promise.resolve(getters.getUserData(state));
          })
          .catch((error) => {
            printLog(`Error when parsing credentials ${error}`);
            return Promise.reject(`${error}`);
          });
      })
      .catch((error) => {
        printLog(`Error when creating credentials ${error}`);
        return Promise.reject(`${error}`);
      });
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
      return Promise.reject(`Unable to sign in : ${error}`);
    }
  },

  async getCredentialInNavigator({ commit, state }, user) {
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
        return "User is logged in";
      } else {
        printLog(`Unable to retrieve credential respons`, rawAttestation);
        return Promise.reject(`Unable to retrieve credential response`);
      }
    } catch (error) {
      printLog(`Error in getCredentialInNavigator : `, error);
      return Promise.reject(
        "Error in getCredentialInNavigator : " + error.message
      );
    }
  },

  async logoutUser() {
    try {
      await Auth.signOut();
      return Promise.resolve(true);
    } catch (error) {
      printLog(`Error signing out = ${error}`);
      return error;
    }
  },

  async resendConfirmationCode({ commit, state }) {
    const userData = getters.getUserData(state);
    console.log("resendConfirmationCode username=" + userData.username);
    try {
      await Auth.resendSignUp(userData.username);
      console.log("code resent successfully");
      return Promise.resolve(true);
    } catch (err) {
      console.log("error resending code: ", err);
    }
  },
  async handleSignUpWithPhone () {
    //event.preventDefault();
    console.log("In function handleSignUpWithPhone");

    if (!wssClient) {
      // Loading button
      setIsLoading(true);

      // Show message
      setProgressMsg("Openning websocket connection...");

      const client = new WebSocketClient(
        onOpenCallback,
        onConnectionIdCallback,
        onCloseCallback
      );
      // Set state value
      setWssClient(client);
    } else {
      console.log("WssClient already is already in state");
    }
  }
};

//helper function
const _queryServer = async (path, payload = {}) => {
  printLog("************ QUERYING SERVER ***************");
  printLog("**** URL" + path);
  printLog("**** PARAMS", payload);
  return webAuthnServer({
    mode: "cors",
    url: path,
    method: "POST",
    data: payload,
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  })
    .then((response) => {
      printLog("**** RESPONSE.DATA", response.data);
      if (response.data.status === "OK") {
        return Promise.resolve(response.data.data);
      } else {
        return Promise.reject(response.data.message);
      }
    })
    .catch((e) => {
      printLog("**** ERROR.DATA", e);
      return Promise.reject(e);
    });
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
  // printLog("Base 64 url ##1 " + base64url);
  let input = base64url.replace(/-/g, "+").replace(/_/g, "/");
  // printLog("Base 64 url ##2 " + input);
  let diff = input.length % 4;
  if (!diff) {
    while (diff) {
      input += "=";
      diff--;
    }
  }
  let matob = atob(input);
  // printLog("Base 64 url ##3 matob = " + matob);
  const val = Uint8Array.from(matob, (c) => c.charCodeAt(0));
  // printLog("Before return = " + val);
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
    console.log(name);
    console.log(object);
  }
}

function isJSON(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

/******************************************************
 * WebSocket functions
 */
 const getAssertionUrl = (connectionId) => {
  // const currentUrl = new URL(window.location.href);
  // console.log("siteUrl = ", currentUrl.origin);

  // Verify if this env var exists
  if (process.env.REACT_APP_MOBILE_URL) {
    const mobileUrl = new URL(process.env.REACT_APP_MOBILE_URL);
    console.log("siteUrl = ", mobileUrl.origin);

    // Create params
    const params = {
      connectionId: connectionId,
      username: username,
      fullname: fullname,
    };

    // Create query string
    const queryString = new URLSearchParams(params);

    // create Assertion URL
    const assertionUrl = new URL(`/getassertion?${queryString}`, mobileUrl);
    console.log("Assertion URL = " + assertionUrl);

    return assertionUrl.toString();
  } else {
    throw new Error("process.env.REACT_APP_MOBILE_URL is null");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
