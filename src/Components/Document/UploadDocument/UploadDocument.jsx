import React, { Fragment, useRef, useState } from "react";

import "./UploadDocument.css";
import { createDocument } from "../../../Api/Service/document.service";
import uploadImage from "../../../assets/upload.png";
import { FaFileAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

// const allowedTypes = ["image/jpeg", "image/png", "application/pdf", ".mp4", ".mkav", ".pptx", ".ppt"];

function UploadDocument() {
  const [isValidFile, setIsValidFile] = useState(true);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    validateFile(file)
    setFileData(file)
    if (!file) {
      return setIsValidFile(false);
    }
    const fileName = file.name.length > 12 ? `${file.name.substring(0,13)}... .${file.name.split('.')[1]}` : file.name;

    setFiles(prevState => [...prevState, {name: fileName, loading: 0}]);

  }

  function validateFile(value) {
    const parts = value.name.split(".");
    const extension = parts[parts.length - 1];
    const acceptedType = [
      "mp4",
      "mkv",
      "jpg",
      "png",
      "jpeg",
      "docx",
      // "pptx",
      "pdf",
      "doc",
      // "ppt",
      "txt",
    ];
    if (!acceptedType.includes(extension.toLowerCase())) {
      return setIsValidFile(false);
    }
    if (value.size > 25 * 1024 * 1024) {
      return setIsValidFile(false);
    }
    setIsValidFile(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    // const file = fd.get("file");
    

    // Format data submited
    const data = new FormData();

   
    data.append("file", fileData);
    data.append(
      "content",
      JSON.stringify({
        name: fd.get("name"),
        description: fd.get("description"),
        content: fd.get("content"),
      })
    );
    setShowProgress(true);

    axios.post('http://localhost/document', data, {
      onUploadProgress: ({loaded, total}) => {
        
          const newFiles = [...files];
          newFiles[newFiles.length - 1].loading = Math.floor((loaded / total) * 100);
          setFiles(newFiles);
        if (loaded == total) {
          const fileSize = total < 1024 ? `${total} KB` :`${loaded / (1014*1024).toFixed(2)} MB`;
          setUploadedFiles([...uploadedFiles, {name: files[0].name, size: fileSize}]);
          setFiles([]);
          setShowProgress(false);
        }

      }
    })
    .then(()  => {
      event.target.reset()
    })
    .catch(err => console.log(err))
  };

  return (
    <Fragment>
      <div className="container">
        <div className="form-container">
          <div className="text">Upload Your Document</div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div className="input-data">
                <label htmlFor="name">File Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  minLength={3}
                />
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  rows="8"
                  cols="80"
                  name="description"
                  id="description"
                  required
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="description">Description</label>
                <br />
              </div>
            </div>

            <div className="form-row">
              <div className={"input-data textarea "}>
                <textarea
                  rows="8"
                  cols="80"
                  name="content"
                  id="content"
                  required
                ></textarea>
                <br />
                <div className="underline "></div>
                <label htmlFor="content">Content</label>
                <br />
              </div>
            </div>

            <div className="form-row">
              <div className="input-data select">
                <label htmlFor="version">Versions</label>
                <select name="version" id="version" required>
                  <option value="1.0.0">1.0.0</option>
                </select>
              </div>
            </div>

            <div  className="upload-box">
              <p>Upload file</p>
              <div className="browse-file">
              <div className="file-input"  onClick={handleFileInputClick}>
                <input
                  type="file"
                  name="file"
                  accept="video/mp4, video/mkv, .jpg, .png, .jpeg, .docx, .pdf, .doc, .txt"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                <div className="icon">
                  <img src={uploadImage} alt="upload-image" />
                </div>
                <p>Browse File to upload</p>
                <br />
              </div>
              {!isValidFile && <p>File is not valid </p>}
            </div>
            </div>

            { showProgress && (
              <section className="loading-area">
                {
                files.map((file,index) => {
                  return   (<li className="row" key={index}>
                <i className="fas fa-file-alt">
                  <FaFileAlt />
                </i>
                <div className="content">
                  <div className="details">
                    <span className="file-name">{`${file.name} - uploading`}</span>
                    <span className="percent">{`${file.loading}%`}</span>
                  </div>
                  <div className="loading-bar">
                    <div className="loading" style={{width: `${file.loading}%`}}></div>
                  </div>
                </div>
              </li>)
                })}
              
            </section>
            )  }
           
            <section className="uploaded-area">
              {uploadedFiles.map((file, index) => {
                <li className="row" key={index}>
                <i className="fas fa-file-alt">
                  <FaFileAlt />
                </i>
                <div className="content">
                  {/* <i className="fas fa-file-alt">
                    <FaFileAlt />
                  </i> */}
                  <div className="details">
                    <div className="file-name">{file.name}</div>
                    <div className="size-file">{file.size}</div>
                  </div>
                  
                </div>
                <i className="fas fa-check"><FaCheck /></i>
              </li>
              })
              
              }
            </section>

            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UploadDocument;
