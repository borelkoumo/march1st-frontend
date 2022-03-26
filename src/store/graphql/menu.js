import { gql } from "graphql-tag";

const allMenu = {
  query: gql`
    query Menus {
      menus {
        data {
          id
          attributes {
            name
            parent
          }
        }
      }
    }
  `,
};

export { allMenu };
