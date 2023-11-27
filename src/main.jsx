import React from "react";
import ReactDOM from "react-dom/client";
import ViewDoc from "./Components/User/ViewDoc/ViewDoc.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ViewDoc />
    </BrowserRouter>
  </React.StrictMode>
);
