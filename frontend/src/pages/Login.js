import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from './useDocumentTitle';

import './Common.css';

import {LOGIN_MUTATION} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";


export default function Login(props) {
    useDocumentTitle('Sign In');

    const initailvariable = {email:"", password:""}
    const [user, createUser] = useState(initailvariable)

    const  handleData =(event)=>{
        const {name, value} = event.target
        createUser({...user, [name]:value})
    }

   const [tokenAuth, {error}] = useMutation(LOGIN_MUTATION);

   const loginSubmit = (event)=>{
    event.preventDefault(); 
    tokenAuth({ variables: {
        email:    user.email.value,
        password: user.password.value
    } });    
     console.log(user)
     event.target.reset();
   }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              onChange={handleData}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              onChange={handleData}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}

          <p className="redirect-link text-right mt-2">
            <Link to="/register" className="link">Register</Link>
          </p>
        </div>
      </form>
    </div>
  )
}