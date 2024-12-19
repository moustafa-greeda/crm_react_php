import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import App from './App';
<<<<<<<<< Temporary merge branch 1
import { BrowserRouter } from 'react-router';

=========
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
>>>>>>>>> Temporary merge branch 2

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
