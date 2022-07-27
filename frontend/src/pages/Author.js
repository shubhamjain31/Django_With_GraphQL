import React, { useState } from "react";
import useDocumentTitle from './useDocumentTitle';

import './Common.css';

import {AUTHOR_MUTATION} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify';

export default function Author(props) {
    useDocumentTitle('Create Author');

    const initailvariable = {name:"", biodata:""}
    const [user, createUser] = useState(initailvariable)

    const  handleData =(event)=>{
        const {name, value} = event.target
        createUser({...user, [name]:value})
    }

   const [addAuthor, {error}] = useMutation(AUTHOR_MUTATION,{
      onCompleted: (data) => {
        toast('Author Added!',{type: toast.TYPE.SUCCESS});
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

   const authorSubmit = (event)=>{
    event.preventDefault(); 
    addAuthor({ variables: {
        name:    user.name,
        biodata: user.biodata
    } });    
     event.target.reset();
   }
   

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={authorSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Author</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter name"
              name="name"
              onChange={handleData}
            />
          </div>
          <div className="form-group mt-3">
            <label>Biodata</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter biodata"
              name="biodata"
              onChange={handleData}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
          
        </div>
      </form>
    </div>
  )
}