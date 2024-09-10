import { gql } from '@urql/core';

export const GetUserById = gql`
  query GetUserById($arg: UUID!) {
    notionUserCollection(first: 1, filter: { id: { eq: $arg } }) {
      edges {
        node {
          id
          name
          bot_id
          avatar_url
          notion_uid
          notionPage {
            page_id
            workspace_id
            workspace_icon
            workspace_name
          }
        }
      }
    }
  }
`;
