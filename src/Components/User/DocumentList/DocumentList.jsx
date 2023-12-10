
import { Modal } from "antd";
import UpdateDocument from "../UploadDocument/UpdateDocument";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';
import { getDocument } from "../../../Api/Service/document.service";

function DocumentList() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [id, setId] = useState();
  const [version, setVersion] = useState();
  
  const handleUpdate = (id, version) => {
    setId(id)
    setVersion(version)
    setOpenModal(true);
  };

  const handleOk = (isUpdated) => {
    setIsUpdated(isUpdated)
    setOpenModal(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
  };

  const handleDetails = (id, version) => {
    getDocument(`document/${id}/${version || 'latest'}`)
    .then((res) => {
      window.open(res.data.documentVersion.url, '__blank');
    })
  }

  const handlePageClick = (event) => {
    console.log("even lib: ", event)
    setPageNo(+event.selected)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsUpdated(false);
      const res = await getDocument(`document?pageNo=${pageNo}&pageSize=10`);
      setDocuments(res.data.content);
      setPageCount(res.data.totalPages);
    };

    fetchData();
  }, [pageNo, isUpdated]);

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
            <td>{format(new Date(document.lastModified), 'dd/MM/yyyy')}</td>
            <td><Button size="sm" style={{marginLeft: '12px'}} variant="success" onClick={() => handleDetails(document.id, document.lastVersion)}>View</Button>
            <Button
                size="sm"
                variant="warning"
                style={{marginLeft: '12px'}}
                onClick={() => handleUpdate(document.id, document.lastVersion)}
              >
                Update
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
  <Modal
        title= {
        <div style={
         { textAlign: 'center',
          fontSize: 24,
          fontWeight: 600,
          color: '#199cff',
          fontFamily: 'Poppins'
        }
          
        }>
          Update your document
          
        </div>
      
        }
        open={openModal}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        style= {{
          top:20,
        }}
        styles={{
          content: {width: 700},
          title: {fontSize: 50}
        
        }}
      >
       <UpdateDocument id={id} handleUpdate = {handleOk}/>
      </Modal>
  </div>
  );
}

export default DocumentList