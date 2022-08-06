import React, { useState } from "react";
import { Link } from 'react-router-dom'
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';
import { useQuery, useMutation } from '@apollo/client';
import {GET_POSTS} from "../GraphQL/Queries";
import {NavbarSection} from "../navbar";

import Table from 'react-bootstrap/Table';

export default function Authors(props) {
    useDocumentTitle('Posts');

    const { loading, error, data } = useQuery(GET_POSTS);
    console.log(data)

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