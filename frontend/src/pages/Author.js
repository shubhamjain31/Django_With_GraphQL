import React, { useState, useEffect } from "react";
import useDocumentTitle from './useDocumentTitle';
import { Link, useNavigate } from "react-router-dom";

import './Common.css';

import {Add_AUTHOR_MUTATION, EDIT_AUTHOR_MUTATION} from "../GraphQL/Mutations";
import {GET_AUTHOR} from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Author(props) {
  const navigate = useNavigate();
  
   const params = useParams();
   const _id = params.authorId;
   const isAddMode = !_id;

   useDocumentTitle(isAddMode ? 'Create Author' : 'Edit Author');

    const initailvariable = {name:"", biodata:""}
    const [user, createNewAuthor] = useState(initailvariable)
    

    const  handleData =(event)=>{
        const {name, value} = event.target
        createNewAuthor({...user, [name]:value})
    }


   const [addAuthor, newAuthor] = useMutation(Add_AUTHOR_MUTATION,{
      onCompleted: (data) => {
        toast('Author Added!',{type: toast.TYPE.SUCCESS});
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [editAuthor] = useMutation(EDIT_AUTHOR_MUTATION, { variables : { id:Number(_id) }});


  //  const authorSubmit = (event)=>{
  //   event.preventDefault(); 
  //   addAuthor({ variables: {
    //       name:    user.name,
    //       biodata: user.biodata
    //   } });    
  //    event.target.reset();
  //  }

  function authorCreate(event){
      event.preventDefault(); 
      addAuthor({ variables: {
        name:    user.name,
        biodata: user.biodata
      } });    
      event.target.reset();
    }
    
  function authorUpdate(event){
      event.preventDefault();
      editAuthor({ variables: {
            name:    user.name,
            biodata: user.biodata
        } });    
        event.target.reset();
        navigate('/authors')
        toast('Author Updated!',{type: toast.TYPE.SUCCESS});
      }
      
   function authorSubmit(event) {
     return isAddMode
        ? authorCreate(event)
        : authorUpdate(event);
    }
   
  
   const { loading, error, data } = useQuery(GET_AUTHOR, { variables : { authorId:_id }, skip: isAddMode});

   if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
        return <div>Error! {error.message}</div>
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
              defaultValue={isAddMode ? "" : data['author'].name}
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
              defaultValue={isAddMode ? "" : data['author'].biodata}
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