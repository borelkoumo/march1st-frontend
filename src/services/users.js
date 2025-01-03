import apolloClient from "../boot/apollo";
import {
  COMPAGNIES_QUERY,
  HACKERS_QUERY,
  USERS_QUERY,
  MYROLE_QUERY,
  LOGIN_MUTATION,
  COMPANY_QUERY,
  HACKER_QUERY,
  MARCH1st_QUERY,
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
    COMPAGNIES_QUERY.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.query(COMPAGNIES_QUERY);
    const data = result.data.companies.data;
    //console.log(data);
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
    COMPAGNY_USERS.variables.companyId = companyId;
    //console.log(MYROLE_QUERY);
    const result = await apolloClient.query(COMPAGNY_USERS);
    const data = result.data.companyUsers.data;
    let companyUsers = data.map(function (res) {
      let companyUser = {
        id: res.id,
        first_name: res.attributes.first_name,
        last_name: res.attributes.last_name,
        user: {
          id: res.attributes.user.data.id,
          email: res.attributes.user.data.attributes.email,
          username: res.attributes.user.data.attributes.username,
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
    return companyUsers;
    //return Promise.resolve(companyUsers);
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
      id: result.data.companyUsers.data[0].attributes.company.data.id,
      company_name:
        result.data.companyUsers.data[0].attributes.company.data.attributes
          .company_name,
      company_logo:
        result.data.companyUsers.data[0].attributes.company.data.attributes
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
      id: result.data.hackers.data[0].id,
      first_name: result.data.hackers.data[0].attributes.first_name,
      last_name: result.data.hackers.data[0].attributes.last_name,
      profile_picture_url:
        result.data.hackers.data[0].attributes.profile_picture_url,
      phone: result.data.hackers.data[0].attributes.phone,
    };
    return Promise.resolve(hacker);
  } catch (error) {
    return Promise.reject(error);
  }
};
const _getMarch1st = async function (credentials) {
  try {
    MARCH1st_QUERY.context.headers.authorization =
      "Bearer " + credentials.token;
    MARCH1st_QUERY.variables.userId = credentials.id;

    const result = await apolloClient.query(MARCH1st_QUERY);
    const march1st = {
      id: result.data.march1stUsers.data[0].id,
      first_name: result.data.march1stUsers.data[0].attributes.name,

      profile_picture_url: "",
      phone: result.data.march1stUsers.data[0].attributes.phone,
    };
    return Promise.resolve(march1st);
  } catch (error) {
    return Promise.reject(error);
  }
};
const _getMyRole = async function (credentials) {
  //console.log("credential in _getMyRole", credentials);
  try {
    MYROLE_QUERY.context.headers.authorization = "Bearer " + credentials.token;
    MYROLE_QUERY.variables.userId = credentials.user.id;
    //console.log(MYROLE_QUERY);
    const result = await apolloClient.query(MYROLE_QUERY);
    let type = result.data.me.role.type;
    let role = "public";
    let company = null;
    let user = {
      company: null,
      companyUser: null,
      hacker: null,
      march1st: null,
      role: null,
      type: null,
    };
    if (type === "m1_account_manager") {
      console.log(result.data.march1stUsers);
    } else if (type === "hacker") {
      user.hacker = {
        role: "hacker",
        id: result.data.hackers.data[0].id,
        first_name: result.data.hackers.data[0].attributes.first_name,
        last_name: result.data.hackers.data[0].attributes.last_name,
        profile_picture_url:
          result.data.hackers.data[0].attributes.profile_picture_url,
        phone: result.data.hackers.data[0].attributes.phone,
        adress: result.data.hackers.data[0].attributes.adress,
      };
      user.role = "hacker";
    } else if (type === "program_manager" || type === "program_super_admin") {
      user.companyUser = {
        id: result.data.companyUsers.data[0].id,
        first_name: result.data.companyUsers.data[0].attributes.first_name,
        last_name: result.data.companyUsers.data[0].attributes.last_name,
        profile_picture_url:
          result.data.companyUsers.data[0].attributes.profile_picture_url,
        title: result.data.companyUsers.data[0].attributes.title,
        user: {
          id: result.data.companyUsers.data[0].attributes.user.data.id,
          role: "client",
          type: type == "program_super_admin" ? "super_manager" : "manager",
        },
        company: {
          id: result.data.companyUsers.data[0].attributes.company.data.id,
          company_name:
            result.data.companyUsers.data[0].attributes.company.data.attributes
              .company_name,
          company_logo:
            result.data.companyUsers.data[0].attributes.company.data.attributes
              .company_logo,
        },
      };
      user.company = {
        id: result.data.companyUsers.data[0].attributes.company.data.id,
        company_name:
          result.data.companyUsers.data[0].attributes.company.data.attributes
            .company_name,
        company_logo:
          result.data.companyUsers.data[0].attributes.company.data.attributes
            .company_logo,
      };
      user.role = "client";
      user.type = type == "program_super_admin" ? "super_manager" : "manager";
    } else {
      throw new Error(type + " not pris en charge");
    }

    /*let data = {
      company,
      role,
      type,
    };*/

    return Promise.resolve(user);
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
  _getMarch1st,
};
