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
    query GetHackers{
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
};

/**
 * query all compagnies from database
 */
const COMPAGNIES_QUERY = {
  query: gql`
    query GetCompanies{
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
          user{
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
export { HACKERS_QUERY, LOGIN_MUTATION, COMPAGNIES_QUERY, USERS_QUERY };
