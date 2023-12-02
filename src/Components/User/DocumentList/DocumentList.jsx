/* eslint-disable no-unused-vars */
import react, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
function DocumentList() {
  const handleDelete = (id) => {
    console.log("Deleting document with ID:", id);
  };
  
  const [documents, setDocuments] = useState([]);
  const sendData = {
    "id": 1,
    "password": "091002",
    "name": "Tuan Kiet Update",
    "phone": "0963987948",
    "dob": "09/10/2002",
    "role": "admin",
    "gender": "true"
  };
  useEffect(() => {
    axios.get("http://localhost:80/document?orderBy=name&pageSize=2", sendData).then(res => {
      console.log(res);
      setDocuments(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
    <div className="documentlist" style={{margin : 'auto auto', transform: 'translateX(100%)'}}>
    <Table striped bordered hover style={{textAlign: 'center'}}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Description</th>
          <th>Owner</th>
          <th>Access</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document, index) => (
          <tr key={index}>
            <td>{document.filename}</td>
            <td>{document.description}</td>
            <td>{document.name}</td>
            <td><Link to={document.url} style={{textDecoration: 'none'}}>Click Here!</Link></td>
            <td>
              <Link to={`/documentlist/${document.id}`} style={{paddingRight: '5px'}}>
                <Button variant="warning">Edit</Button>
              </Link>
              
              <Button
                variant="danger"
                onClick={() => handleDelete(document.id) }
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  </div>
  );
}

export default DocumentList
