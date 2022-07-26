import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from './useDocumentTitle';

import { toast } from 'react-toastify';

import './Common.css';


export default function Register(props) {
    useDocumentTitle('Sign Up');

    const initailvariable = {email:"", password1:"", password2:""}
    const [user, registerUser] = useState(initailvariable)

    const  handleData =(event)=>{
        const {name, value} = event.target
        registerUser({...user, [name]:value})
    }

   const loginSubmit = (event)=>{
    event.preventDefault();     
     console.log(user)
     toast('Hello Geeks 2',{type: toast.TYPE.SUCCESS});
     event.target.reset();
   }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
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
              name="password1"
              onChange={handleData}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter confirm password"
              name="password2"
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