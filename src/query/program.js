import { gql } from "graphql-tag";

/**
 * query programs from database
 */
const PROGRAMS_QUERY = {
  query: gql`
    query {
      programs {
        data {
          id
          attributes {
            program_title
            program_description
            program_guidelines_1
            program_guidelines_2
            program_scope
            legal_terms
            program_picture_url
            is_closed
            closed_at
            createdAt
            reward_guidelines
            program_type
            safe_harbour_type
            reward_range
            reward_type,
            createdAt,
            hackers {
              data {
                id
                attributes {
                  first_name
                }
              }
            }
            company {
              data {
                id
              }
            }
            company_users {
              data {
                id
                attributes {
                  first_name
                  last_name
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
            invitations {
              data {
                id
                attributes {
                  hacker {
                    data {
                      id
                    }
                  }
                }
              }
            }
            submissions {
              data {
                id
                attributes {
                  submission_text
                  submission_title
                  submission_statuses(sort: "createdAt:DESC") {
                    data {
                      id
                      attributes {
                        status
                        status_title
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
  context: {
    headers: {
      /* authorization: token, */
    },
  },
};

/**
 * query one program from database
 * @param id of program
 * @return a program who has this id
 */
const ONE_PROGRAM_QUERY = {
  query: gql`
    query program($id: ID!) {
      program(id: $id) {
        data {
          id
          attributes {
            program_title
            program_description
            program_guidelines_1
            program_guidelines_2
            program_scope
            legal_terms
            program_picture_url
            is_closed
            closed_at
            createdAt
            reward_guidelines
            program_type
            safe_harbour_type
            reward_range
            reward_type
            hackers {
              data {
                id
                attributes {
                  first_name
                }
              }
            }
            invitations {
              data {
                id
                attributes {
                  hacker {
                    data {
                      id
                    }
                  }
                }
              }
            }
            submissions {
              data {
                id
                attributes {
                  submission_text
                  submission_title
                  submission_statuses(sort: "createdAt:DESC") {
                    data {
                      id
                      attributes {
                        status
                        status_title
                      }
                    }
                  }
                }
              }
            }
            company {
              data {
                id
              }
            }
            company_users {
              data {
                id
                attributes {
                  first_name
                  last_name
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
  variables: {},
  context: {
    headers: {
      /* authorization: token, */
    },
  }
};

const { mutate: JOIN_PROGRAM_MUTATION } = {
  mutate: {
    mutation: gql`
      mutation updateProgram($id: ID!, $hackers: [ID]!) {
        updateProgram(id: $id, data: { hackers: $hackers }) {
          data {
            id
            attributes {
              hackers {
                data {
                  id
                }
              }
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

const { mutate: CREATE_PROGRAM } = {
  mutate: {
    mutation: gql`
      mutation createProgram($program: ProgramInput!) {
        createProgram(data: $program) {
          data {
            id
            attributes {
              program_title
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
const { mutate: CREATE_INVITATION } = {
  mutate: {
    mutation: gql`
      mutation createInvitation($invitation: InvitationInput!) {
        createInvitation(data: $invitation) {
          data {
            id
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
  PROGRAMS_QUERY,
  ONE_PROGRAM_QUERY,
  JOIN_PROGRAM_MUTATION,
  CREATE_PROGRAM,
  CREATE_INVITATION,
};
