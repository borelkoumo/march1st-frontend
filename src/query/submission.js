import { gql } from "graphql-tag";

const { mutate: CREATE_SUBMISSION } = {
    mutate: {
      mutation: gql`
        mutation createSubmission($submission: SubmissionInput!) {
            createSubmission(data: $submission) {
            data {
              id
              attributes {
                submission_title
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
    },
  };

  export {
    CREATE_SUBMISSION
  };