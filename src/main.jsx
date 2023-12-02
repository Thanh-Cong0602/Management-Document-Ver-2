import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DocumentList from './Components/User/Document/DocumentsList.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
  <DocumentList></DocumentList>
  </React.StrictMode>,
)
