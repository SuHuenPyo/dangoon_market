import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// meta
import { HelmetProvider } from "react-helmet-async";
// Route
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from 'react-redux'; 
import Store from './Store';

import ScrollToTop from './utils/ScrollTop';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
      <ScrollToTop/>
      <HelmetProvider>
      <App />
      </HelmetProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
