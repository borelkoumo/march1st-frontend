import apolloClient from "../boot/apollo";
import {
  COMPAGNIES_QUERY,
  HACKERS_QUERY,
  USERS_QUERY,
  MYROLE_QUERY,
  LOGIN_MUTATION,
  COMPANY_QUERY,
  HACKER_QUERY,
  COMPAGNY_USERS,
  USER_COMPANY_USER,
} from "../query/users";
const _getUsers = async function () {
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
};

const _getHackers = async function () {
  try {
    HACKERS_QUERY.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
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

const _getCompanyUsers = async function (companyId) {
  try {
    COMPAGNY_USERS.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    COMPAGNY_USERS.variables.userId = companyId;
    //console.log(MYROLE_QUERY);
    const result = await apolloClient.query(COMPAGNY_USERS);
    const data = result.data.company.data.attributes.company_users.data;
    let companyUsers = data.map(function (res) {
      let companyUser = {
        id: res.id,
        first_name: res.attributes.first_name,
        last_name: res.attributes.last_name,
        user: {
          id:res.attributes.user.data.id,
          email:res.attributes.user.data.attributes.email,
          username:res.attributes.user.data.attributes.username,
        },
      };
      return companyUser;
    });
    /*const allCompanyUsers = companyUsers.map(async function(c_u){
      // Retrouver l'utilisateur à l'aide de son id de company_user
      USER_COMPANY_USER.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      USER_COMPANY_USER.variables.companyUserId = c_u.id;
      const result2 = await apolloClient.query(USER_COMPANY_USER);
      const data2 = result2.data.companyUser.data.attributes.user.data;
      
      c_u.user.id = data2.id;
      c_u.user.username = data2.attributes.username;
      c_u.user.email = data2.attributes.email;
      return c_u;
    })*/
    
    return Promise.resolve(companyUsers);
  } catch (error) {
    console.log("Error in _getCompanyUsers", error);
  }
};

const _getCompany = async function (credentials) {
  try {
    COMPANY_QUERY.context.headers.authorization = "Bearer " + credentials.token;
    COMPANY_QUERY.variables.userId = credentials.id;
    //console.log(MYROLE_QUERY);
    const result = await apolloClient.query(COMPANY_QUERY);
    const company = {
      id: result.data.companyUser.data.attributes.company.data.id,
      company_name:
        result.data.companyUser.data.attributes.company.data.attributes
          .company_name,
      company_logo:
        result.data.companyUser.data.attributes.company.data.attributes
          .company_logo,
    };
    return Promise.resolve(company);
  } catch (error) {
    return Promise.reject(error);
  }
};
const _getHacker = async function (credentials) {
  try {
    HACKER_QUERY.context.headers.authorization = "Bearer " + credentials.token;
    HACKER_QUERY.variables.userId = credentials.id;

    const result = await apolloClient.query(HACKER_QUERY);
    console.log(result.data);
    const hacker = {
      id: result.data.hacker.data.id,
      first_name: result.data.hacker.data.attributes.first_name,
      last_name: result.data.hacker.data.attributes.last_name,
      profile_picture_url:
        result.data.hacker.data.attributes.profile_picture_url,
      phone: result.data.hacker.data.attributes.phone,
    };
    return Promise.resolve(hacker);
  } catch (error) {
    return Promise.reject(error);
  }
};
const _getMyRole = async function (credentials) {
  console.log("credential in _getMyRole", credentials);
  try {
    MYROLE_QUERY.context.headers.authorization = "Bearer " + credentials.token;
    MYROLE_QUERY.variables.userId = credentials.user.id;
    //console.log(MYROLE_QUERY);
    const result = await apolloClient.query(MYROLE_QUERY);
    let role = result.data.me.role.type;
    let company = null;
    if (role === "m1_account_manager") {
      //company=result.data.march1stUser.data.attributes.company;
      role = "admin";
    } else if (role === "hacker") {
      //company=result.data.companyUser.data.attributes.company;
    } else if (role === "program_manager" || role === "program_super_admin") {
      console.log("company user in getMyRole", result.data);
      //company=result.data.companyUser.data.attributes.company;
      role = "client";
    } else {
      throw new Error(role + " not pris en charge");
    }

    let data = {
      company,
      role,
    };

    return Promise.resolve(data);
  } catch (error) {
    console.log("error in _getMyRole", error);
    return Promise.reject(0);
  }
};

const _loginUser = async function (payload) {
  try {
    LOGIN_MUTATION.variables.user = payload;
    const result = await apolloClient.mutate(LOGIN_MUTATION);
    let user = result.data.login.user;
    user.typeUser = "Public";
    let token = result.data.login.jwt;
    let login = {
      user: user,
      token: token,
    };
    return Promise.resolve(login);
  } catch (error) {
    return Promise.reject(0);
  }
};
export {
  _getHackers,
  _loginUser,
  _getCompanies,
  _getUsers,
  _getMyRole,
  _getCompanyUsers,
  _getCompany,
  _getHacker,
};
