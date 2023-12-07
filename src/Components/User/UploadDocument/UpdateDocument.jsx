/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { Fragment, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { FaFileAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select  } from "antd";

import "./FormDocument.css";
import { updateDoc, getDoc } from "../../../Api/Service/doc.service";
import uploadImage from "../../../assets/upload.png";
import axios from "axios";

function UpdateDocument({id , handleUpdate}) {

  const [isValid, setIsValid] = useState({
    file: true,
    content: true,
    name: true,
    description: true,
  });
  const [enteredInput, setEnteredInput] = useState({
    file: null,
    content: "",
    name: "",
    description: "",
    filename: "",
    version: "",
    newVersion: null
  });
  const fileInputRef = useRef(null);
  const buttonRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    setIsSuccess(false)
    getDoc(`${id}/latest`)
      .then(res => {
        if(res.status === 200) {
          const {id, name, description, versionList, documentVersion} = res.data;
          setEnteredInput({
            id,
            name,
            description,
            version: documentVersion.version,
            content: documentVersion.content,
            filename: documentVersion.filename
          })
          const documentUrlArr =  documentVersion.url.split('/')
          const objectName = documentUrlArr[documentUrlArr.length-1];
          fetch(`https://storage.googleapis.com/download/storage/v1/b/spring-60dd1.appspot.com/o/${objectName}?alt=media`)
            .then(response => {
              return response.blob();
            })
            .then(blob => {
              // Process the blob as needed
              blob.name = documentVersion.filename;
              blob.lastModified = new Date();
              const file = new File([blob], documentVersion.filename , {type: blob.type})
              setEnteredInput(prevState => ({
                ...prevState,
                ['file'] : file
              }))
            })
            .catch(error => {
              error('There is something wrong when fetch data.')
              console.error('Fetch error:', error)
            } );


        }

      })
      .catch(err => {
        error("Failed")
        console.log(err);
      })
  }, [id, isSuccess])

  const validate = (identifier, value) => {
    if (identifier === "file") {
      const parts = value.name.split(".");
      const extension = parts[parts.length - 1];
      const acceptedType = [
        "jpeg", "png", "jpg", "pdf", "ppt", "mp4", "mkv", "xls"
      ];
      if (!acceptedType.includes(extension.toLowerCase())) {
        return setIsValid(prevState => ({
           ...prevState,
          [identifier]: false
        }))
      }
      if (value.size > 25 * 1024 * 1024) {
        return setIsValid(prevState => ({
          ...prevState,
         [identifier]: false
       }))
      }
    } else {
      if (value.trim().length < 3) {
        return setIsValid(prevState => ({
          ...prevState,
         [identifier]: false
       }))
      }
    }

    return setIsValid(prevState => ({
      ...prevState,
     [identifier]: true
   }))
  };



  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
   
  };

 
  const handleInputChange = (identifier, event) => {
      if (identifier === 'version') {
        return  setEnteredInput(prevState => ({
          ...prevState,
          ['newVersion']: event.target.value
        }))
      }
      setEnteredInput(prevState => ({
        ...prevState,
        [identifier]: event.target.value
      }))
      
  }
  
  const handleInputBlur = (identifier, value) => {
    validate(identifier, value)
  }

  const handleFileInputChange = (event) => {

    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return setIsValid(prevState => ({
      ...prevState,
     ['file']: false
   }))
    }
    validate("file", selectedFile);

    setEnteredInput(prevState => {
      return {
        ...prevState,
        ['file']: selectedFile
      }
    });
    const reader = new FileReader();
    reader.onerror = () => {
      setIsValid(prevState => ({
        ...prevState,
       ['file']: false
     }))
    };
 
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = (event.loaded / event.total) * 100;
        setProgress(percentLoaded);
      }
    };
    reader.onloadend = () => {
      setProgress(100);
    };
    reader.readAsArrayBuffer(selectedFile);
    setProgress(0);
  };


  const handleSubmit = (event) => {
    setIsSuccess(false);

    setIsSubmited(true);
    event.preventDefault();
    const data = new FormData();
 
    // Format data submited
    data.append("file", enteredInput.file);

    const {newVersion} = enteredInput;
    if (newVersion === enteredInput.version) {
      data.append(
        "content",
        JSON.stringify({
          id: id,
          description: enteredInput.description,
          content: enteredInput.content,
        })
      );
    }
    else {
      data.append(
        "content",
        JSON.stringify({
          id: id,
          version: parseInt(newVersion),
          description: enteredInput.description,
          content: enteredInput.content,
        })
      );
    }
    updateDoc("", data)
      .then(() => {
        success("File uploaded successfully!");
        event.target.reset();
        setProgress(0);
        setIsSuccess(true);
        setEnteredInput({
          file: null,
          content: "",
          name: "",
          description: "",
        });
        setIsSubmited(false);
        handleUpdate(true);
      })
      .catch((err) => {
        error("Uploading failed!");
        console.log(err);
      });
  };
  

  return (
    <Fragment>
   
        <div className="container">
        <div className="form-container">
          {contextHolder}
          <form onSubmit={handleSubmit} encType="multipart/form-data" ref={buttonRef}>
            <div className="form-row">
              <div className={`input-data ${!isValid.name ? " invalid" : ""}`}>
                <label htmlFor="name">File Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  minLength={3}
                  value={enteredInput.name}
                  onChange={(event) =>  handleInputChange("name", event)}
                  onBlur={(event) =>  handleInputBlur("name", event.target.value)}
                  required
                />
                <div className="underline "></div>
              </div>
            </div>

            <div className="form-row">
              <div
                className={`input-data textarea ${
                  !isValid.description ? " invalid" : ""
                }`}
              >
                <textarea
                  rows="8"
                  cols="80"
                  name="description"
                  id="description"
                  value={enteredInput.description}

                  onChange={(event) =>  handleInputChange("description", event)}
                  onBlur={(event) =>  handleInputBlur("description", event.target.value)}

                  required
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="description">Description</label>
                <br />
              </div>
            </div>

            <div className="form-row">
              <div
                className={`input-data textarea ${
                  !isValid.content ? " invalid" : ""
                }`}
              >
                <textarea
                  rows="8"
                  cols="80"
                  name="content"
                  id="content"
                  value={enteredInput.content}

                  onChange={(event) =>  handleInputChange("content", event)}
                  onBlur={(event) =>  handleInputBlur("content", event.target.value)}

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
                <select 
                  name="version" 
                  id="version" 
                  required
                  
                  onChange={(event) =>  handleInputChange("version", event)}

                >
                  {/* {versionList.map(version => {
                    return (
                      <option value={version} key={version} >{version}</option>
                    )
                  })
                   
              
                  } */}
                  <optgroup label="Current">
                    <option value={enteredInput.version}>{`${enteredInput.version}`}</option>
                  </optgroup>
                  <optgroup label="New">
                    <option value={parseInt(enteredInput.version) + 1}>{`${parseInt(enteredInput.version) + 1}.0`}</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="upload-box">
              <p>Upload file</p>
              <div className="browse-file">
                <div className="file-input" onClick={handleFileClick}>
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
              </div>
            </div>
            {enteredInput.filename && enteredInput.file && (
              <section className="loading-area">
             
                <li className="row">
                  <i className="fas fa-file-alt">
                    <FaFileAlt />
                  </i>
                  <div className="content">
                    <div className="details">
                    
                      <span className="file-name">{`${
                        enteredInput.file.name.length > 12
                          ? `${enteredInput.file.name.substring(0, 13)}... .${
                            enteredInput.file.name.split(".")[1]
                            }`
                          : enteredInput.file.name
                      } `}</span>
                     <span className="percent">
                          {  !enteredInput.file ? (
                            `${progress}%`
                          ) : (
                            <i className="fas fa-check">
                              <FaCheck />
                            </i>
                          )}
                        </span>
                    </div>
                    {progress !== 100 && progress !== 0 && (
                        <div className="loading-bar">
                          <div
                            className="loading"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      )}
                  </div>
                </li>
                {!isValid.file && <p className="error">File is not valid </p>}
                {(  isSubmited) && (
                  <div className="center">
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                    />
                  </div>
                )}
                </section>
              )}

            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <button
                  type="submit"
                  className={`${
                    
                    enteredInput.file &&
                    isValid.content &&
                    isValid.description &&
                    isValid.name &&
                    isValid.file
                      ? ""
                      : "disabled"
                  }`}
                >
                  Submit
                </button>
           
              </div>
            </div>
            
                
          </form>
        </div>
      </div>

      
      
    </Fragment>
  );
}

export default UpdateDocument;
