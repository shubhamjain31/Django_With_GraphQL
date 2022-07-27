import React, { useState } from "react";
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';
import { useQuery } from '@apollo/client';
import {GET_AUTHORS} from "../GraphQL/Queries";

import Table from 'react-bootstrap/Table';

export default function Authors(props) {
    useDocumentTitle('Authors');

    const { loading, error, data } = useQuery(GET_AUTHORS);
    console.log(data.allAuthors)
   
  return data.allAuthors.map(({ id, name, biodata }) => (
    <div className="inner-form-container">
      <div className="inner-form">
        <div className="inner-form-content" key={id}>
          <h3 className="inner-form-title">Authors</h3>
          <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Biodata</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>
            </tbody>
            </Table>
          
        </div>
      </div>
    </div>
  ));
}