import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import { HashRouter } from "react-router-dom";




ReactDOM.render(
  <HashRouter basename={`${process.env.PUBLIC_URL}/`}>
    <App />
  </HashRouter>
  , document.getElementById('root'));