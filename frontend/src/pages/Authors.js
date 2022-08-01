import React, { useState } from "react";
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';
import { useQuery } from '@apollo/client';
import {GET_AUTHORS} from "../GraphQL/Queries";

import Table from 'react-bootstrap/Table';
import { Modal, Button } from "react-bootstrap";

export default function Authors(props) {
    useDocumentTitle('Authors');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
        return <div>Error! {error.message}</div>
    }
   
  return (
    <div className="inner-form-container">
      <div className="inner-form">
        <div className="inner-form-content">
          <h3 className="inner-form-title">Authors</h3>
          <Table striped bordered hover>
            <thead>
                <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Biodata</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                data.allAuthors?.map((alldata, index) => {
                  return <tr key={alldata.id}><td>{index+1}</td><td>{alldata?.name}</td><td>{alldata?.biodata }</td><td>
                    <a href={`/edit-author/${alldata.id}`} className="btn btn-success btn-sm px-3">Edit</a><button className="btn btn-danger my-2 btn-sm" onClick={handleShow}>Delete</button></td></tr>
            })
            }
            </tbody>
            </Table>
          
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this author?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}