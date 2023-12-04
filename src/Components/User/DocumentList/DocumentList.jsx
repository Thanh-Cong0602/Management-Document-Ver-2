import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { getDocument } from "../../../Api/Service/document.service";
function DocumentList() {
  const handleDelete = (id) => {
    alert("Are you sure delete the document?");
    setDeleteDoc(id);
  };
  const handleDetails = (id, version) => {
    setId(id);
    setVersion(version);
  }

  const [documents, setDocuments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [id, setId] = useState();
  const [version, setVersion] = useState();
  const [deleteDoc, setDeleteDoc] = useState();

  useEffect(() => {
    getDocument(`document?pageNo=${pageNo}&pageSize=10`)
    .then(res => {
      setDocuments(res.data.content); 
      setPageCount(res.data.totalPages);
    });
  }, [pageNo]);   

  useEffect(() => {
   getDocument(`document/${id}/${version}`)
    .then((res) => {
      window.location.href = res.data.documentVersion.url;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    axios.delete(`document/${deleteDoc}`)
    .then((res) => {
      if(res.status == 200){
        alert("Deleted successfull!");
        window.location.reload();
      }
      else alert("Not Successfull");
    })
  }, [deleteDoc]);

 const handlePageClick = (event) => {
  console.log("even lib: ", event)
  setPageNo(+event.selected)
 }
  return (
    <div>
    <div className="documentlist" style={{margin : 'auto', marginBlock: 'center'}}>
    <Table striped bordered hover style={{textAlign: 'center'}}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Description</th>
          <th>Version</th>
          <th>Modified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.name}</td>
            <td>{document.description}</td>
            <td>{document.lastVersion}</td>
            <td>{document.lastModified}</td>
            <td><Button variant="success" onClick={() => handleDetails(document.id, document.lastVersion)}>View</Button>
            <Button
                variant="danger"
                onClick={() => handleDelete(document.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"

        renderOnZeroPageCount={null}
      />
  </div>
  </div>
  );
}

export default DocumentList