import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation tokenAuth($email: String!, $password: String!){
        tokenAuth(email:$email ,password:$password){
        success
        errors
        token
        user{
            id
            verified
        }
        }
    }
    `;

export const REGISTER_MUTATION = gql`
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser(username:$username, email:$email ,password:$password){
            user{
                id
                email
              }
        }
    }
    `;

export const AUTHOR_MUTATION = gql`
    mutation addAuthor($name: String!, $biodata: String!) {
        addAuthor(name:$name, biodata:$biodata) {
        author{
            id
            name
            biodata
        }
        }
    }
    `;