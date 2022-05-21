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
const { mutate: CREATE_SUBMISSION_STATUS } = {
  mutate: {
    mutation: gql`
      mutation createSubmissionStatus(
        $submissionStatus: SubmissionStatusInput!
      ) {
        createSubmissionStatus(data: $submissionStatus) {
          data {
            id
            attributes {
              status_title
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

const SUBMISSIONS_HACKER = {
  query: gql`
    query submissions($hackerId: ID!) {
      hacker(id: $hackerId) {
        data {
          id
          attributes {
            submissions {
              data {
                id
                attributes {
                  submission_title
                  severity_level
                  submission_target
                  submission_text
                  createdAt
                  program {
                    data {
                      id
                      attributes {
                        program_title
                        program_type
                        program_picture_url
                        program_description
                        reward_range
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

export { CREATE_SUBMISSION, CREATE_SUBMISSION_STATUS, SUBMISSIONS_HACKER };
