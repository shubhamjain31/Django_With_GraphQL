import { gql } from "@apollo/client";
import { CreateUserType } from "../Schemas/TypeDefs/CreateUserType";

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
    mutation createUser($input: CreateUser!){
        createUser(input: $input){
            user{
                id
                email
              }
        }
    }
    `;