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
    Auth.configure(getAuthConfig());
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
    commit("setTypeUser", payload.role);

    const userAttr = {
      name: formatFullName(payload.fullName),
      locale: state.locale.value,
      "custom:role":payload.role,
      "custom:companyName":payload.role==='client'?payload.companyName.trim():"",
      "custom:title":payload.role==='client'?payload.title.trim():"",
      "custom:userId": "",
      "custom:joinedOn": new Date().toISOString().substring(0, 10),
    };

    const userData = {
      email: payload.email.trim(),
      username:payload.email.trim(),
      password: payload.password,
      attributes: userAttr,
    };
    console.log("La valeur de userData = ",userData);

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

  async onSubmitValidationCode({ state, dispatch}, code) {
    printLog(`Code = ${code}`);
    /**
     * User confirm signUp in cognito user pool
     */
    const userData = getters.getUserData(state);
    printLog(`userData`, userData);
    try {
      const status = await Auth.confirmSignUp(userData.email, code);
      // User is confirmed.
      printLog(`Auth.confirmSignUp status = ${status}`);
      printLog("onSubmitValidationCode/userData",userData);

      dispatch('strapiSignUp',getters.getUserData(state))
      return "Cognito account created.";
    } catch (error) {
      printLog(`Error in Auth.confirmSignUp`, error);
      throw new Error(error);
    }
  },


  async strapiSignUp({state},userData){
    try {
      printLog("strapiSignUp/userData",userData)
      const role = userData.attributes['custom:role'];
      const url=role==='client'?"/custom/signup-client":"/custom/signup-hacker";
      let strapiUser={};
      if(role==='client'){
        strapiUser={
          username:userData.username,
          email:userData.email,
          provider:"local",
          password:"",
          confirm:true,
          blocked:false,
          companyName:userData.attributes['custom:companyName'],
          fullName:userData.name,
          title:userData.attributes['custom:title']
        }
      }
      else{
        strapiUser={
          username:userData.username,
          email:userData.email,
          fullName:userData.name,
          provider:"local",
          password:"",
          confirm:true,
          blocked:false
        }
      }
      printLog('strapiSignUp/strapiUser',strapiUser);
      const data = await _postQueryServer(url,strapiUser);
      console.log("La valeur de data dans = "+ data);
      return data;
    }catch (e) {
      console.log(`Erreur dans strapiSignUp ${e}`);
    }
  },
  async onSubmitLoginForm({ commit }, payload) {
    console.log("valeur de payload ", payload);
    printLog(`Inside onSubmitLoginForm function. Params=`, payload);
    /**
     * https://docs.amplify.aws/lib/auth/switch-auth/q/platform/js/#customauth-flow
     */
    Auth.configure(getAuthConfig());

    try {
      const cognitoUser = await Auth.signIn(payload.email, payload.password);
      printLog("SignIn result. User=", cognitoUser);
      return cognitoUser;
    } catch (error) {
      printLog(`Unable to sign in`, error);
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
