import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query allAuthors{
    allAuthors{
      id
      name
      biodata
    }
  }
`;