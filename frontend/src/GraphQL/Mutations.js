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

export const Add_AUTHOR_MUTATION = gql`
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

export const EDIT_AUTHOR_MUTATION = gql`
    mutation updateAuthor($id: Int!, $name: String!, $biodata: String!) {
        updateAuthor(id: $id, name:$name, biodata:$biodata) {
        author{
            id
            name
            biodata
        }
        }
    }
    `;

export const DELETE_AUTHOR_MUTATION = gql`
    mutation deleteAuthor($id: Int!) {
        deleteAuthor(id: $id) {
            status
            message
        }
    }
    `;