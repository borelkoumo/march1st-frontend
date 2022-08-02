import { gql } from "graphql-tag";

const COMPANY_USER_MUTATION = {
  mutate: {
    mutation: gql`
      mutation createCompanyUser($companyUser: CompanyUserInput!) {
        createCompanyUser(data: $companyUser) {
          data {
            id
            attributes {

            }
          }
        }
      }
    `,
    variables: {
      //user: { identifier: "sdfdf", password: "dfdfdf" },
    },
    context: {
      headers: {
        /* authorization: token, */
      },
    },
  }
};
