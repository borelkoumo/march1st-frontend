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
            reward_type
          }
        }
      }
    }
  `,
};

export { PROGRAMS_QUERY };
