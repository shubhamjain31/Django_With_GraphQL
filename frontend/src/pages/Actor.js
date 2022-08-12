import React, { useState, useEffect } from "react";
import useDocumentTitle from './useDocumentTitle';
import { Link, useNavigate } from "react-router-dom";

import './Common.css';

import {Add_ACTOR_MUTATION, EDIT_ACTOR_MUTATION} from "../GraphQL/Mutations";
import {GET_ACTOR} from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Actor(props) {
  const navigate = useNavigate();
  
   const params = useParams();
   const _id = params.actorId;
   const isAddMode = !_id;

   useDocumentTitle(isAddMode ? 'Create Actor' : 'Edit Actor');

    const initailvariable = {name:"",}
    const [user, createNewActor] = useState(initailvariable)
    

    const  handleData =(event)=>{
        const {name, value} = event.target
        createNewActor({...user, [name]:value})
    }


   const [addActor, newActor] = useMutation(Add_ACTOR_MUTATION,{
      onCompleted: (data) => {
        toast('Actor Added!',{type: toast.TYPE.SUCCESS});
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [editActor] = useMutation(EDIT_ACTOR_MUTATION, { variables : { id:Number(_id) }});

  function actorCreate(event){
      event.preventDefault(); 
      addActor({ variables: {
        name:    user.name
      } });    
      event.target.reset();
    }
    
  function actorUpdate(event){
      event.preventDefault();
      editActor({ variables: {
            name:    user.name
        } });    
        event.target.reset();
        navigate('/actors')
        toast('Actor Updated!',{type: toast.TYPE.SUCCESS});
      }
      
   function actorSubmit(event) {
     return isAddMode
        ? actorCreate(event)
        : actorUpdate(event);
    }
   
  
   const { loading, error, data } = useQuery(GET_ACTOR, { variables : { actorId:Number(_id) }, skip: isAddMode});

   if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
        return <div>Error! {error.message}</div>
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={actorSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Actor</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter name"
              name="name"
              onChange={handleData}
              defaultValue={isAddMode ? "" : data['actor'].name}
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