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
const SUBMISSIONS_SUPER_MANAGER = {
  query: gql`
    query submissions($companyId: ID!) {
      company(id: $companyId) {
        data {
          id
          attributes {
            programs {
              data {
                id
                attributes {
                  submissions {
                    data {
                      id
                      attributes {
                        submission_text
                        submission_title
                        submission_target
                        severity_level
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
const SUBMISSIONS_MANAGER = {
  query: gql`
    query submissions($companyUserId: ID!) {
      companyUser(id: $companyUserId) {
        data {
          id
          attributes {
            programs {
              data {
                id
                attributes {
                  submissions {
                    data {
                      id
                      attributes {
                        submission_text
                        submission_title
                        submission_target
                        severity_level
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
const SUBMISSIONS_ADMIN = {
  query: gql`
    query submissions {
      submissions {
        data {
          id
          attributes {
            submission_text
            submission_title
            submission_target
            severity_level
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

export {
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
  SUBMISSIONS_ADMIN,
};
