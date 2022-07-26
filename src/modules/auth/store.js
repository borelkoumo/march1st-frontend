import { webAuthnServer } from "../../boot/axios";
import {_postQueryServer} from "src/store/utils/helper";
import {
  base64UrlEncode,
  base64UrlDecode,
  printLog,
  formatFullName,
  getAuthConfig,
} from "../../store/utils/base64";

import {_getMyRole,
  _loginUser,
   _getCompanies,
   _getHackers,
   _getCompanyUsers
  } from "../../services/users";

// Amplify libraries
import { Auth } from "@aws-amplify/auth";


const state = {
  locale: { label: "English (United States)", value: "en-US" },
  userData:null,
  myuser:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
  /*user:{
    username:"",
    role:"",
    email:"",
    id:null,

    company:null,
    hacker:null,
    companyUser:null,
    march1st:null
  },*/
  mesusers:localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[],

  companies:[],
  myhackers:[],
}
const getters = {
  getCompanies(state){
    let companies = localStorage.getItem('companies')?JSON.parse(localStorage.getItem('companies')):[
      {
        id:1,
        company_name:"Facebook France",
        companyUsers:[]
      },
      {
        id:2,
        company_name:"Twitter",
        companyUsers:[]
      }
    ];
    return companies;
  },
  getCompany(state){
    return(id)=>{
      const companyData = getters.getCompanies().filter((company)=> company.id==id);
      if(companyData.length>0) return companyData[0];
      return null;
    }
  },
  getAllUsers(state){
    let users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
    return users;
  },
  getUser(state){
    let user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    return user;
  },
  getUserData(state){
    return state.userData;
  },
  getRole(state){
    let user = this.getUser();
    return user.role;
  },
  getHackers(state){
    return state.myhackers;
  }

}
const mutations = {
  ADD_USER(state,user){
    let id = state.mesusers.length+1;
    user.id = id;
    const users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];


    if(user.company){
      const companies = getters.getCompanies().map(function(company){
        if(company.id==user.company.id){
          let company_user={
            id:company.companyUsers.length+1,
            first_name:user.first_name,
            user:user
          }
          //user.companyUser=company_user;
          company.companyUsers.push(company_user);
        }
        return company;
      })
      state.companies=companies;
      localStorage.setItem('companies',JSON.stringify(companies));
    }
    else if(user.hacker){
      user.hacker.id=id
    }
    else if(user.march1st){
      user.march1st.id=id
    }
    users.push(user);
    state.mesusers = users;
    localStorage.setItem('users',JSON.stringify(state.mesusers));
  },
  SET_USER(state,user){
    /*if(user.company){
      const companies = getters.getCompanies().map(function(company){
        if(company.id==user.company.id){
          let company_user={
            id:company.companyUsers.length+1,
            first_name:user.first_name,
            user:user
          }
          //user.companyUser=company_user;
          company.companyUsers.push(company_user);
        }
        return company;
      })
      state.companies=companies;
      localStorage.setItem('companies',JSON.stringify(companies));
    }
    else if(user.hacker){
      user.hacker.id=id
    }
    else if(user.march1st){
      user.march1st.id=id
    }*/
    //console.log(user);
    localStorage.setItem('user',JSON.stringify(user));
    state.myuser=JSON.parse(localStorage.getItem('user'));
  },
  SET_USER_DATA(state,user){
    state.userData=user;
  },
  SET_USERS(state,users){

  },
  SET_HACKERS(state, hackers){
    state.myhackers = hackers;
  },
  SET_COMPAGNIES(state,compagnies){
    state.compagnies = compagnies;
  }
}
const actions = {
  async onSubmitSignUpForm({ commit, state }, payload) {
    printLog("onSubmitSignUpForm payload", payload);

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
      commit("SET_USER_DATA", userData);

      // Set also cognitoUser
      //commit("setCognitoUser", cognitoUser);
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
          fullName:userData.attributes.name,
          title:userData.attributes['custom:title']
        }
      }
      else{
        strapiUser={
          username:userData.username,
          email:userData.email,
          fullName:userData.attributes.name,
          provider:"local",
          password:"",
          confirm:true,
          blocked:false
        }
      }
      console.log('strapiSignUp/strapiUser',strapiUser);
      //printLog('strapiSignUp/strapiUser',strapiUser);
      const data = await _postQueryServer(url,strapiUser);
      console.log("La valeur de data dans = "+ data);
      return data;
    }catch (e) {
      console.log(`Erreur dans strapiSignUp ${e}`);
    }
  },

  async onSubmitLoginForm({ commit }, payload) {
    printLog(`Inside onSubmitLoginForm function. Params=`, payload);
    Auth.configure(getAuthConfig());
    try {
      const cognitoUser = await Auth.signIn(payload.email, payload.password);
      printLog("SignIn result. User=", cognitoUser);
      let jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
      console.log('onSubmitLoginForm/cognitoUser',cognitoUser);
      //dispatch('strapiSignIn',jwtToken);
      const role=cognitoUser.attributes['custom:role'];
      let user={
        username:cognitoUser.attributes['custom:username'],
        role:role,
        email:cognitoUser.attributes.email,
        type:role=='client'?'super_manager':null,
        first_name:cognitoUser.attributes.name,

        company:role==='client'?{}:null,
        hacker:role==='hacker'?{}:null,
        companyUser:role==='client'?{}:null,
        march1st:role==='march1st'?{}:null
      }

      user.company.id=1;
      user.company.company_name=cognitoUser.attributes['custom:companyName']
      await commit('SET_USER',user);
      console.log("onSubmitLoginForm/user ",user);
      localStorage.setItem('token',jwtToken);
      return cognitoUser;
    } catch (error) {
      printLog(`Unable to sign in`, error);
      throw new Error(error);
    }
  },

  async strapiSignIn2({commit,dispatch},userData){
    try {
      const credentials = await _loginUser({
        identifier: userData.email,
        password: userData.password
      });
      //console.log(credentials)
      localStorage.setItem("token",credentials.token);
      dispatch('GET_COMPAGNIES')
      const roleUser = await _getMyRole(credentials);
      let user = {
        id:credentials.user.id,
        email:credentials.user.email,
        username:credentials.user.username,
        role:roleUser.role,
        type:roleUser.type,
        companyUser:roleUser.companyUser,
        company:roleUser.company,
        hacker:roleUser.hacker,
        march1st:roleUser.march1st
      }
      console.log("strapiSignIn2/user :",user);
      commit('SET_USER',user);
    } catch (error) {

    }
  },

  async strapiSignIn({ commit }, jwtToken) {
    try {
      const url = "/custom/login-client";
      let token = {
        idToken: jwtToken,
      };
      const data = await _postQueryServer(url, token);

      console.log("La valeur de data dans createUser = ", data);
      let type = data.user.role.type;
      let role = "public";
      let company = null;
      let hacker = null;
      let march1st = null;
      let dataObject = {
        user: data.user,
        token: data.jwtStrapi,
      };
      if (type === "m1_account_manager") {
        march1st = await _getMarch1st({
          id: data.user.id,
          token: data.jwtStrapi,
        });
        type = "admin";
        (dataObject.typeUser = type), (dataObject.march1st = march1st);
      } else if (type === "hacker") {
        hacker = await _getHacker({
          id: data.user.id,
          token: data.jwtStrapi,
        });
        (dataObject.typeUser = type), (dataObject.hacker = hacker);
      } else if (type === "program_manager" || type === "program_super_admin") {
        let company_user = data.user.company_user;

        company = await _getCompany({
          id: company_user.id,
          token: data.jwtStrapi,
        });
        if (type == "program_manager") role = "manager";
        else role = "super_manager";
        type = "client";
        (dataObject.typeUser = type), (dataObject.company = company);
        dataObject.role = role;
        dataObject.company_user = company_user;
      } else {
        throw new Error(type + " not pris en charge");
      }
      //console.log(credentials.user)

      //console.log(dataObject)
      commit("setUser", dataObject);

      /*console.log(data);*/
      return Promise.resolve(dataObject);
    } catch (error) {
      let errorData = {
        token: null,
        user: {},
      };

      console.log("Error in createUser", error.message);
      commit("setUser", errorData);
      return Promise.reject(0);
    }
  },
  async logOutUser({commit}){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  register({commit},formData){
    let user = JSON.parse(JSON.stringify(formData))
    if(user.roleUser.value==3){
      user.role="client",
      user.type = user.typeUser.value;

      user.company.id=user.company.value;
      user.company.company_name=user.company.label

      delete user.company.value;
      delete user.company.label;
    }
    else if(user.roleUser.value==2){
      user.role="march1st"
      user.march1st={
        first_name:user.first_name,
        profile_picture_url:"",
        last_name:"",
        id:null
      }
    }
    else{
      user.role="hacker"
      user.hacker={
        first_name:user.first_name,
        profile_picture_url:"",
        last_name:"",
        id:null
      }
    }
    commit('ADD_USER',user);
  },
  login({commit},user){
    const users = getters.getAllUsers();
    const data = users.filter((existUser)=> existUser.id==user.value);
    commit('SET_USER',data[0])
    //console.log(data[0])
  },

  async GET_USERS({commit}){
    const users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[]
    commit('SET_USERS',users);
  },

  async GET_HACKERS({commit}){
    //const users = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
    //const hackers = users.filter((user) => user.role==='hacker');
    try {
      const hackers = await _getHackers();
      commit('SET_HACKERS',hackers);
      console.log(hackers);
      return hackers;
    } catch (error) {

    }
  },

  async GET_MY_COMPANYUSERS({commit}){
    const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    let companyUsers=[];
    if(user && user.company){
      companyUsers = await _getCompanyUsers(user.company.id);
      companyUsers = companyUsers.filter((company_user) => company_user.user.email!=user.email);
    }
    return companyUsers;
  },

  async GET_COMPAGNIES({commit}){
    try {
      const compagnies = await _getCompanies();
      commit('SET_COMPAGNIES',compagnies);
    } catch (error) {

    }
  }
}

export default{
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
