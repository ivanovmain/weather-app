import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import { HashRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme();



ReactDOM.render(
  <HashRouter basename={`${process.env.PUBLIC_URL}/`}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </HashRouter>
  , document.getElementById('root'));