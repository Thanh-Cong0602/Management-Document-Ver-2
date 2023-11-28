import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';



function UpdateFile(id) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)

  const [fileName, setFileName] = useState('');


  useEffect(() => {
    // fetch data
    //  fetch(
    //      `http://localhost/document/${id.id}/latest`,
    //     )
    //   .then((res) =>{
    //     console.log(res)
    //   }  
    //   )
    //   .then(data => {
    //     console.log(data)
    //     setName(data.name)
    //     setDescription(data.description)
    //     // setFileName(data.)
    //   }
    //   ).catch(err => console.log(err));
    axios.get( `http://localhost/document/${id.id}/latest`).then((res) => {
        console.log(res)

      const data = res.data;
        setName(data.name)
        setDescription(data.description)
        setFileName(data.documentVersion.filename)
    })

    }

  , []);
  const inputChangeHandler = (setValue, event) => {
    console.log(1)
    setValue(event.target.value);
  };
  const fileChangeHandler = (event) => {
  const selectedFile = event.target.files[0];
  setIsSuccess(false);
  console.log(selectedFile.type);

  // Checking if the file type is allowed or not
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", ".mp4", ".mkav", ".pptx", ".ppt"];
  if (!allowedTypes.includes(selectedFile?.type)) {
    setIsError(true);
    setErrorMsg("Invalid file")
    return;
  }
  setIsError(false);
  setFile(selectedFile);
  };

  const handleSubmit = () => {
    event.preventDefault();

    if (isError) return;
    setErrorMsg("");

    // Checking if the file has been selected
    if (!file) {
      setIsError(true);
      setErrorMsg("Please select a file.");
      return;
    }

  
    if(!isError) {
    const formData = new FormData();
    const content = JSON.stringify({
      id: id.id,
      name: name,
      description: description,
      content: 'Content for first version'
    })
    formData.append("file", file);
    formData.append("content", content);
  
    fetch("http://localhost/document", {
      method: "PUT",
      body: formData,

    })
      .then((response) => console.log(response))
      .then((result) => {
        // navigate("/user/homepage");
        setName("");
        setDescription("");
        setFile(null);
        // setPage(1);
        console.log("Success:", result);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
      setIsError(false);
      setIsSuccess(true);
    }

  }

  return (
    <Fragment>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

     
      <div className="upload-form">
        <form className="form-style" encType="multipart/form-data">
          <h4>Update Document </h4> <br />
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => inputChangeHandler(setName, e)}
            value={name}
          />{" "}
          <br/>
           <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Version"
            onChange={(e) => inputChangeHandler(setName, e)}
          
          />{" "}
          <br />
          <textarea
            className="form-control"
            name="description"
            rows="3"
            cols="50"
            placeholder="Description"
            onChange={(e) => inputChangeHandler(setDescription, e)}
            value={description}

          ></textarea>{" "}
          <br />
          <input
            onChange={fileChangeHandler}
            type="file"
            className="form-control"
            name="file"
            accept=".pdf,.jpeg,, .png, .jpg, video/m4v, .ppt, .pptx"   //png/jpg/jpeg m4v mkav ppt pptx docx doc
            
            defaultValue={fileName}

          />{" "}
          <br />

          
         

          <br/>
          {isError && <div className="error-text">{errorMsg}</div>}
          <div className="btn btn-primary" onClick={handleSubmit} >
            Upload
          </div>
          {isSuccess && <div className="success-text">Valid File Type</div>}
        </form>
      </div>
    </Fragment>
  );
}

export default UpdateFile
