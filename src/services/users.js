import apolloClient from "../boot/apollo";
import {
  COMPAGNIES_QUERY,
  HACKERS_QUERY,
  LOGIN_MUTATION,
  USERS_QUERY
} from "../query/users";
const _getUsers = async function(){
  try {
    const result = await apolloClient.query(USERS_QUERY);
    const data = result.data.usersPermissionsUsers.data;
    const userList = data.map(function (u) {
      let user = {};
      user.id = u.id;
      user.username = u.attributes.username;
      user.email = u.attributes.email;
      //hacker.typeUser = "";
      return user;
    });
    return userList;
  } catch (error) {
    console.log(error);
  }
}

const _getHackers = async function () {
  try {
    const result = await apolloClient.query(HACKERS_QUERY);
    const data = result.data.hackers.data;
    const hackersList = data.map(function (u) {
      let hacker = {};
      hacker.id = u.id;
      hacker.username = u.attributes.user.data.attributes.username;
      hacker.email = u.attributes.user.data.attributes.email;
      hacker.first_name = u.attributes.first_name;
      hacker.last_name = u.attributes.last_name;
      hacker.phone = u.attributes.phone;
      hacker.typeUser = "hacker";
      return hacker;
    });
    return hackersList;
  } catch (error) {
    console.log(error);
  }
};

const _getCompanies = async function () {
  try {
    const result = await apolloClient.query(COMPAGNIES_QUERY);
    const data = result.data.companies.data;
    console.log(data);
    const companiesList = data.map(function (u) {
      let company = {};
      company.id = u.id;
      company.company_name = u.attributes.company_name;
      company.address = u.attributes.address;
      company.company_logo = u.attributes.compagny_logo;
      let users = u.attributes.company_users.data;
      let i = 0;
      company.company_users = users.map(function (c_u) {
        i++;
        let compUser = {};
        compUser.id = c_u.id;
        compUser.first_name = c_u.attributes.first_name;
        compUser.profile_picture_url = c_u.attributes.profile_picture_url;
        compUser.email = c_u.attributes.user.data.attributes.email;
        compUser.username = c_u.attributes.user.data.attributes.username;
        compUser.label = c_u.attributes.first_name;
        compUser.value = c_u.id;
        if (i == 3) compUser.role = "super_admin";
        else compUser.role = "manager";
        return compUser;
      });
      company.typeUser = "client";
      return company;
    });
    //console.log(companiesList);
    return companiesList;
  } catch (error) {
    console.log(error);
  }
};

const _loginUser = async function (payload) {
  try {
    LOGIN_MUTATION.variables.user = payload;
    const result = await apolloClient.mutate(LOGIN_MUTATION);
    let user = result.data.login.user;
    user.typeUser="hacker";
    let token = result.data.login.jwt;
    let login={
      user:user,
      token:token
    }
    return Promise.resolve(login);
  } catch (error) {
    return Promise.reject(0);
  }
};

export { _getHackers, _loginUser, _getCompanies, _getUsers};
