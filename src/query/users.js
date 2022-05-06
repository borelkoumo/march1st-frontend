import { gql } from "graphql-tag";

/**
 * query hackers from database
 */
const HACKERS_QUERY = {
  query: gql`
    query {
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
    query {
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
        }
      }
    `,
    variables: {
      //user: { identifier: "sdfdf", password: "dfdfdf" },
    },
  },
};
export { HACKERS_QUERY, LOGIN_MUTATION, COMPAGNIES_QUERY };
