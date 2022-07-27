import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;