/* eslint-disable no-unused-vars */

import React, { Fragment, useRef, useState } from "react";
import { message } from "antd";
import { FaFileAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import "./FormDocument.css";
import { createDoc } from "../../../Api/Service/doc.service";
import uploadImage from "../../../assets/upload.png";

function UpdateDocument(id) {
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
  });
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
 

  const validate = (identifier, value) => {
    if (identifier === "file") {
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
      setEnteredInput(prevState => ({
        ...prevState,
        [identifier]: event.target.value
      }))
  }
  
  const handleInputBlur = (identifier, value) => {
    console.log(identifier, value)
    validate(identifier, value)
  }

  const handleFileInputChange = (event) => {
    setIsSuccess(false);

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
    // Simulate Uploading Progress
    // const simulateProgress = () => {
    //   if (progress < 100) {
    //     setProgress((prevProgress) => {
    //       const increment = 1;
    //       return Math.min(prevProgress + increment, 100);
    //     });
    //     setTimeout(simulateProgress, 20);
    //   }
    // };
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
    setIsSubmited(true);
    event.preventDefault();
    const fd = new FormData(event.target);

    // Format data submited
    const data = new FormData();

    data.append("file", enteredInput.file);
    data.append(
      "content",
      JSON.stringify({
        name: enteredInput.name,
        description: enteredInput.description,
        content: enteredInput.content,
      })
    );

    createDoc("", data)
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
      })
      .catch((err) => {
        error("Uploading failed!");
        console.log(err);
      });
  };

  console.log(isValid)

  return (
    <Fragment>
      <div className="container">
        <div className="form-container">
          {contextHolder}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div className={`input-data ${!isValid.name ? " invalid" : ""}`}>
                <label htmlFor="name">File Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  minLength={3}
                  onChange={(event) =>  handleInputChange("name", event)}
                  onBlur={(event) =>  handleInputBlur("name", event.target.value)}
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
                <select name="version" id="version" required
                  onChange={(event) =>  handleInputChange("version", event.target.value)}

                >
                  <option value="1.0.0">1.0.0</option>
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

            {!isSuccess && (
              <section className="loading-area">
                {isValid.file && enteredInput.file && (
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
                          {progress !== 100 && isValid.file ? (
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
                )}
                {!isValid.file && <p className="error">File is not valid </p>}
                {isSubmited && (
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

         
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateDocument;
