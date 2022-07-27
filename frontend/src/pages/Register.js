import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from './useDocumentTitle';

import { toast } from 'react-toastify';

import './Common.css';
import {REGISTER_MUTATION} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

export default function Register(props) {
    useDocumentTitle('Sign Up');

    const initailvariable = {username:"", email:"", password:""}
    const [user, registerUser] = useState(initailvariable)

    const  handleData =(event)=>{
        const {name, value} = event.target
        registerUser({...user, [name]:value})
    }

    const [createUser, {error}] = useMutation(REGISTER_MUTATION);

   const loginSubmit = (event)=>{
    event.preventDefault();     
     console.log(user)
     createUser({ variables: {
        username:  user.username,
        email:     user.email,
        password:  user.password,
    } });   
     toast('User Register!',{type: toast.TYPE.SUCCESS});
     event.target.reset();
   }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              name="username"
              onChange={handleData}
            />
          </div>
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
              Register
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}

          <p className="redirect-link text-right mt-2">
            <Link to="/login" className="link">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}