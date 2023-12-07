import React, { Fragment, useRef, useState } from "react";
import { message } from 'antd';
import { FaFileAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";


import "./UploadDocument.css";
import { createDocument } from "../../../Api/Service/document.service";
import uploadImage from "../../../assets/upload.png";



function UploadDocument() {

  const [isValid, setIsValid] = useState({
    file: true,
    content: true,
    name: true,
    description: true
  });
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'File uploaded successfully!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Uploading failed!',
    });
  };
  const inputValidation = (identifier, value) => {

    if(identifier === 'file') {
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
        return setIsValid(prevState => {
          return {
            ...prevState,
            [identifier]: false
          }
        });
      }
      if (value.size > 25 * 1024 * 1024) {
        return setIsValid(prevState => {
          return {
            ...prevState,
            [identifier]: false
          }
        });
        
      }
    }
    else {
      if (value.length < 3) {
        return setIsValid(prevState => {
          return {
            ...prevState,
            [identifier]: false
          }
        })
      }
    }
    
    return setIsValid(prevState => {
      return {
        ...prevState,
        [identifier]: true
      }
    })
  }
  
  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (event) => {
    setIsSuccess(false)

    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return setIsValid(prevState => {
        return {
          ...prevState,
          ['file']: false
        }
      });
    }

    inputValidation('file',selectedFile)
  
    setFile(selectedFile)

    const reader = new FileReader();
    reader.onerror = () => {
      setIsValid(prevState => {
        return {
          ...prevState,
          ['file']: false
        }
      });
    }
    const simulateProgress = () => {
      if (progress < 100) {
        setProgress((prevProgress) => {
          const increment = 1;
          return Math.min(prevProgress + increment, 100);
        });

        setTimeout(simulateProgress, 20); 
    }
    }

    
    reader.onloadstart = () => {
   
        setTimeout(simulateProgress, 300); 
    }
   

    reader.readAsArrayBuffer(selectedFile);
    
    setProgress(0)
  

  }

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    // Validate

    inputValidation('name', fd.get('name'))
    inputValidation('description', fd.get('description'))
    inputValidation('content', fd.get('content'))

    
    // Format data submited
    const data = new FormData();


    data.append("file", file);
    data.append(
      "content",
      JSON.stringify({
        name: fd.get("name"),
        description: fd.get("description"),
        content: fd.get("content"),
      })
    );

    createDocument('document', data)
    .then(()  => {
      success()
      event.target.reset()
      setProgress(0)
      setIsSuccess(true)
      setFile(null)
    })
    .catch(err => {
      error()
      
      console.log(err)})
  };
  
  return (
    <Fragment>
      <div className="container">
        <div className="form-container">
          <div className="text">Upload Your Document</div>
          {contextHolder}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <div className={`input-data ${!isValid.name? ' invalid': ''}`}>
                <label htmlFor="name">File Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  minLength={3}
                />
                <div className="underline "></div>
              </div>

            </div>

            <div className="form-row">
              <div className={`input-data textarea ${!isValid.description? ' invalid': ''}`}>
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
              <div className={`input-data textarea ${!isValid.content? ' invalid': ''}`}>
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
            </div>
            </div>

            {!isSuccess && ( <section className="loading-area">
                
                {
                  isValid.file && file && ( <li className="row">
                  <i className="fas fa-file-alt">
                    <FaFileAlt />
                  </i>
                  <div className="content">
                    <div className="details">
                      <span className="file-name">{`${file.name.length > 12 ? `${file.name.substring(0,13)}... .${file.name.split('.')[1]}` : file.name} `}</span>
                      <span className="percent">{progress!==100 && isValid.file ? `${progress}%`: (<i className="fas fa-check"><FaCheck /></i>)}</span>
                    </div>
                    {progress !== 100 && progress!==0 && (
                    <div className="loading-bar">
                     <div className="loading" style={{width: `${progress}%`}}></div>
                    </div>
                    )}
                  </div>
                </li>
          )
                }
                {!isValid.file && <p className="error">File is not valid </p>}
                   
                
              </section>
  )}
             

            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <button type="submit" className= {`${progress===100 && file? '': 'disabled'}`}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UploadDocument;
