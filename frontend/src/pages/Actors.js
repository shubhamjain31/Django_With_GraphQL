import React, { useState } from "react";
import { Link } from 'react-router-dom'
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_ACTORS} from "../GraphQL/Queries";
import {NavbarSection} from "../navbar";

import Table from 'react-bootstrap/Table';
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';

export default function Actors(props) {
    useDocumentTitle('Actors');

    const [_id, setID]    = useState(0);
    const [ind, setINDEX]    = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const { loading, error, data } = useQuery(GET_ACTORS);
    console.log(data)
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
        return <div>Error! {error.message}</div>
    }

    const newData   = [...data.actors];
   
  return (
    <div>
        <NavbarSection/>
      <div className="inner-form-container">
        <div className="inner-form">
          <div className="inner-form-content">
            <h3 className="inner-form-title">Actors</h3>
            <Table striped bordered hover>
              <thead>
                  <tr>
                  <th>SNo.</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th><Link to={`/create-actor/`}><button type="button" className="btn  btn-info text-white btn-sm px-3">Add</button></Link></th>
                  </tr>
              </thead>
              <tbody>
              {
                  newData?.map((alldata, index) => {
                    return <tr key={alldata.id}><td>{index+1}</td><td>{alldata?.name}</td><td>{alldata?.createdAt }</td><td>
                      <Link to={`/edit-actor/${alldata.id}`}><button type="button" className="btn btn-success btn-sm px-3">Edit</button></Link>
                      <button className="btn btn-danger my-2 btn-sm">Delete</button></td></tr>
              })
              }
              </tbody>
              </Table>
            
          </div>
        </div>
      </div>
    </div>
  );
}