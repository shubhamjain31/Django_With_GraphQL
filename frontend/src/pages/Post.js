import React, { useState, useEffect } from "react";
import useDocumentTitle from './useDocumentTitle';
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

import './Common.css';

import {Add_POST_MUTATION, EDIT_POST_MUTATION} from "../GraphQL/Mutations";
import {GET_POST, GET_AUTHORS} from "../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Author(props) {
  const navigate = useNavigate();
  
   const params = useParams();
   const _id = params.postId;
   const isAddMode = !_id;

   useDocumentTitle(isAddMode ? 'Create Post' : 'Edit Post');

    const initailvariable = {title:"", content:""}
    const [user, createNewPost] = useState(initailvariable)
    

    const  handleData =(event)=>{
        const {name, value} = event.target
        createNewPost({...user, [name]:value})
    }


   const [addPost, newPost] = useMutation(Add_POST_MUTATION,{
      onCompleted: (data) => {
        toast('Post Added!',{type: toast.TYPE.SUCCESS});
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const [editPost] = useMutation(EDIT_POST_MUTATION, { variables : { id:Number(_id) }});

  function postCreate(event){
      event.preventDefault(); 
      addPost({ variables: {
        title:    user.title,
        content: user.content
      } });    
      event.target.reset();
    }
    
  function postUpdate(event){
      event.preventDefault();
      editPost({ variables: {
            name:    user.name,
            content: user.content
        } });    
        event.target.reset();
        navigate('/posts')
        toast('Post Updated!',{type: toast.TYPE.SUCCESS});
      }
      
   function postSubmit(event) {
     return isAddMode
        ? postCreate(event)
        : postUpdate(event);
    }
   
  
  const authors = useQuery(GET_AUTHORS);
  const posts = useQuery(GET_POST, { variables : { postId:_id }, skip: isAddMode});
  console.log(authors.data,'lfkl')
 
  if (authors.loading) {
    return <div>Loading...</div>
  }
  if (authors.error) {
      return <div>Error! {authors.error.message}</div>
  }


   if (posts.loading) {
      return <div>Loading...</div>
    }
    if (posts.error) {
        return <div>Error! {posts.error.message}</div>
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={postSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Post</h3>
          <div className="form-group mt-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter title"
              name="title"
              onChange={handleData}
              defaultValue={isAddMode ? "" : posts.data['post'].title}
            />
          </div>
          <div className="form-group mt-3">
            <label>Content</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter content"
              name="content"
              onChange={handleData}
              defaultValue={isAddMode ? "" : posts.data['post'].content}
            />
          </div>
          <div className="form-group mt-3">
            <label>Author</label>
            <Form.Select aria-label="Author">
              {/* <option>Open this select menu</option> */}
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
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