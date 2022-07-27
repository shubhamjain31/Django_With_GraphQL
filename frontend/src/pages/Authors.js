import React, { useState } from "react";
import useDocumentTitle from './useDocumentTitle';

import './Inner.css';

import Table from 'react-bootstrap/Table';

export default function Authors(props) {
    useDocumentTitle('Authors');
   
  return (
    <div className="inner-form-container">
      <form className="inner-form">
        <div className="inner-form-content">
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
      </form>
    </div>
  )
}