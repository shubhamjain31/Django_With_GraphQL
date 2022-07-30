import React, { useState, useEffect } from "react";
import useDocumentTitle from './useDocumentTitle';

import './Common.css';

import {AUTHOR_MUTATION} from "../GraphQL/Mutations";
import {GET_AUTHOR} from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Author(props) {
   const params = useParams();
   const _id = params.authorId;
   const isAddMode = !_id;
   console.log(_id)

    const initailvariable = {name:"", biodata:""}
    const [user, createUser] = useState(initailvariable)
    
    // const { loading, error, data } = useQuery(GET_AUTHOR, { variable s: { authorId:_id }});

    const  handleData =(event)=>{
        const {name, value} = event.target
        createUser({...user, [name]:value})
    }

  useDocumentTitle('Create Author');

   const [addAuthor, newAuthor] = useMutation(AUTHOR_MUTATION,{
      onCompleted: (data) => {
        toast('Author Added!',{type: toast.TYPE.SUCCESS});
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  console.log(newAuthor.loading)

   const authorSubmit = (event)=>{
    event.preventDefault(); 
    addAuthor({ variables: {
        name:    user.name,
        biodata: user.biodata
    } });    
     event.target.reset();
   }
   
  //  if (loading) {
  //     return <div>Loading...</div>
  //   }
  //   if (error) {
  //       return <div>Error! {error.message}</div>
  //   }

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
              // value={data['author'].name}
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
              // value={data['author'].biodata}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
            {isAddMode ? 'Add' : 'Edit'}
            </button>
          </div>
          
        </div>
      </form>
    </div>
  )
}