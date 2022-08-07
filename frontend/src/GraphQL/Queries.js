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

export const GET_AUTHOR = gql`
    query author($authorId: String) {
        author(authorId: $authorId) {
          id
          name
          biodata
        }
      }
    `;

export const GET_POSTS = gql`
    query allPosts{
      allPosts{
        id
        title
        content
        user{
          username
        }
      }
    }
  `;

export const GET_POST = gql`
  query post($postId: String) {
      post(postId: $postId) {
        id
        title
        content
      }
    }
  `;