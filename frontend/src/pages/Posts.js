import React, { useState } from "react";
import { Link } from 'react-router-dom'
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_POSTS} from "../GraphQL/Queries";
import {DELETE_POST_MUTATION} from "../GraphQL/Mutations";
import {NavbarSection} from "../navbar";

import Table from 'react-bootstrap/Table';
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';

export default function Authors(props) {
    useDocumentTitle('Posts');

    const [_id, setID]    = useState(0);
    const [ind, setINDEX]    = useState(0);
    const [show, setShow] = useState(false);

    const { loading, error, data } = useQuery(GET_POSTS);
    
    const [deletePost] = useMutation(DELETE_POST_MUTATION, { variables : { id:Number(_id) }});

    const handleClose = () => setShow(false);

    function handleShow(event, _id, index){
      event.preventDefault();
      setShow(true);
      setID(_id);   
      setINDEX(index);   
    }

    const handleDelete = () => {
        deletePost({ variables: {} });   
        setShow(false);
        console.log(newData,ind)
        // data.allAuthors = []
        newData.splice(ind, 1)
        console.log(newData)
        toast('Post Deleted!',{type: toast.TYPE.SUCCESS});
    };

    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
        return <div>Error! {error.message}</div>
    }

    const newData   = [...data.allPosts];
   
  return (
    <div>
        <NavbarSection/>
      <div className="inner-form-container">
        <div className="inner-form">
          <div className="inner-form-content">
            <h3 className="inner-form-title">Posts</h3>
            <Table striped bordered hover>
              <thead>
                  <tr>
                  <th>SNo.</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>User</th>
                  <th><Link to={`/create-post/`}><button type="button" className="btn  btn-info text-white btn-sm px-3">Add</button></Link></th>
                  </tr>
              </thead>
              <tbody>
              {
                  newData?.map((alldata, index) => {
                    return <tr key={alldata.id}><td>{index+1}</td><td>{alldata?.title}</td><td>{alldata?.content }</td>
                    <td>{alldata?.user.username }</td><td>
                      <Link to={`/edit-post/${alldata.id}`}><button type="button" className="btn btn-success btn-sm px-3">Edit</button></Link>
                      <button className="btn btn-danger my-2 btn-sm" onClick={(event) => handleShow(event, alldata?.id, index)}>Delete</button></td></tr>
              })
              }
              </tbody>
              </Table>
            
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete this post {_id}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}