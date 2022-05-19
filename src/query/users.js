import { gql } from "graphql-tag";
/**
 * query all user
 */
const USERS_QUERY = {
  query: gql`
    query GetUsersPermissionsUsers {
      usersPermissionsUsers {
        data {
          id
          attributes {
            username
            email
          }
        }
      }
    }
  `,
};

/**
 * query hackers from database
 */
const HACKERS_QUERY = {
  query: gql`
    query GetHackers {
      hackers {
        data {
          id
          attributes {
            first_name
            last_name
            phone
            profile_picture_url
            user {
              data {
                id
                attributes {
                  username
                  email
                }
              }
            }
          }
        }
      }
    }
  `,
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

/**
 * query all compagnies from database
 */
const COMPAGNIES_QUERY = {
  query: gql`
    query GetCompanies {
      companies {
        data {
          id
          attributes {
            company_name
            address
            company_logo
            company_users {
              data {
                id
                attributes {
                  first_name
                  last_name
                  title
                  profile_picture_url
                  user {
                    data {
                      id
                      attributes {
                        username
                        email
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
};

const COMPAGNY_USERS = {
  query: gql`
    query companyUsers($userId: ID!) {
      company(id: $userId) {
        data {
          id
          attributes {
            company_users {
              data {
                id
                attributes {
                  first_name
                  last_name
                  user{
                    data{
                      id
                      attributes{
                        email
                        username
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

/**
 * login user
 * @param variable: {identifier:email, password:password}
 * @retrun login{jwt}
 */
//mutation login($user: UsersPermissionsLoginInput!)
const { mutate: LOGIN_MUTATION } = {
  mutate: {
    mutation: gql`
      mutation login($user: UsersPermissionsLoginInput!) {
        login(input: $user) {
          jwt
          user {
            id
            email
            username
          }
        }
      }
    `,
    variables: {
      //user: { identifier: "sdfdf", password: "dfdfdf" },
    },
  },
};

//get a role for a user
const MYROLE_QUERY = {
  query: gql`
    query usersPermissionUser($userId: ID!) {
      me {
        role {
          id
          name
          type
        }
        id
      }
      companyUser(id: $userId) {
        data {
          id
          attributes {
            first_name
            company {
              data {
                id
                attributes {
                  company_name
                  company_size
                  company_logo
                }
              }
            }
          }
        }
      }
      hacker(id: $userId) {
        data {
          id
          attributes {
            first_name
          }
        }
      }
      march1stUser(id: $userId) {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

const COMPANY_QUERY = {
  query: gql`
    query companyUser($userId: ID!) {
      companyUser(id: $userId) {
        data {
          id
          attributes {
            first_name
            company {
              data {
                id
                attributes {
                  company_name
                  company_size
                  company_logo
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

const HACKER_QUERY = {
  query: gql`
    query usersPermissionsUser($userId: ID!) {
      hacker(id: $userId) {
        data {
          id
          attributes {
            first_name
            last_name
            profile_picture_url
            phone
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

const USER_COMPANY_USER = {
  query: gql`
    query usersPermissionsUser($companyUserId: ID!) {
      companyUser(id: $companyUserId) {
        data {
          id
          attributes {
            user {
              data {
                id
                attributes {
                  username
                  email
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

export {
  HACKERS_QUERY,
  LOGIN_MUTATION,
  COMPAGNIES_QUERY,
  USERS_QUERY,
  MYROLE_QUERY,
  COMPANY_QUERY,
  HACKER_QUERY,
  COMPAGNY_USERS,
  USER_COMPANY_USER,
};
