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
const { mutate: UPDATE_SUBMISSION } = {
  mutate: {
    mutation: gql`
      mutation updateSubmission(
        $submissionId: ID!
        $submission: SubmissionInput!
      ) {
        createSubmission(id: $submissionId, data: $submission) {
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

/**
 * query one program from database
 * @param id of program
 * @return a program who has this id
 */
const ONE_SUBMISSION_QUERY = {
  query: gql`
    query submission($submissionId: ID!) {
      submission(id: $submissionId) {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
            createdAt
            program {
              data {
                id
                attributes {
                  program_title
                  program_description
                  program_type
                  safe_harbour_type
                  reward_range
                  program_picture_url
                }
              }
            }
            submission_statuses(sort: "createdAt:DESC") {
              data {
                id
                attributes {
                  status
                  status_title
                  createdAt
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
const SUBMISSIONS_HACKER = {
  query: gql`
    query submissions($hackerId: ID!, $page: Int!, $pageSize: Int!) {
      submissions(
        filters: { hacker: { id: { eq: $hackerId } } }
        pagination: { page: $page, pageSize: $pageSize }
      ) {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
            createdAt
            program {
              data {
                id
                attributes {
                  program_title
                  program_description
                  program_type
                  safe_harbour_type
                  reward_range
                  program_picture_url
                }
              }
            }
            submission_statuses(sort: "createdAt:DESC") {
              data {
                id
                attributes {
                  status
                  status_title
                  createdAt
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
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
const SUBMISSIONS_SUPER_MANAGER = {
  query: gql`
    query submissions($companyId: ID!, $page: Int!, $pageSize: Int!) {
      submissions(
        filters: {
          program: { company: { id: { eq: $companyId } } }
          submission_statuses: {
            status: { notIn: ["new", "m1_returned_for_review"] }
          }
        }
        pagination: { page: $page, pageSize: $pageSize }
      ) {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
            createdAt
            program {
              data {
                id
                attributes {
                  program_title
                  program_description
                  program_type
                  safe_harbour_type
                  reward_range
                  program_picture_url
                }
              }
            }
            submission_statuses(sort: "createdAt:DESC") {
              data {
                id
                attributes {
                  status
                  status_title
                  createdAt
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
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
const SUBMISSIONS_MANAGER = {
  query: gql`
    query submissions($companyUserId: ID!, $page: Int!, $pageSize: Int!) {
      submissions(
        filters: {
          program: { company_users: { id: { eq: $companyUserId } } }
          submission_statuses: {
            status: { notIn: ["new", "m1_returned_for_review"] }
          }
        }
        pagination: { page: $page, pageSize: $pageSize }
      ) {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
            createdAt
            program {
              data {
                id
                attributes {
                  program_title
                  program_description
                  program_type
                  safe_harbour_type
                  reward_range
                  program_picture_url
                }
              }
            }
            submission_statuses(sort: "createdAt:DESC") {
              data {
                id
                attributes {
                  status
                  status_title
                  createdAt
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
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
const SUBMISSIONS_ADMIN = {
  query: gql`
    query submissions($page: Int!, $pageSize: Int!) {
      submissions(pagination: { page: $page, pageSize: $pageSize }) {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
            createdAt
            program {
              data {
                id
                attributes {
                  program_title
                  program_description
                  program_type
                  safe_harbour_type
                  reward_range
                  program_picture_url
                }
              }
            }
            submission_statuses(sort: "createdAt:DESC") {
              data {
                id
                attributes {
                  status
                  status_title
                  createdAt
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
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
const SUBMISSION_STATUS = {
  query: gql`
    query submissionStatuses($submissionId: ID!) {
      submissionStatuses(
        filters: { submission: { id: { eq: $submissionId } } }
        sort: "createdAt:DESC"
      ) {
        data {
          id
          attributes {
            status,
            status_title,
            comment,
            createdAt,
            submission{
              data{id}
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
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  UPDATE_SUBMISSION,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
  SUBMISSIONS_ADMIN,
  ONE_SUBMISSION_QUERY,
  SUBMISSION_STATUS
};
