import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Store from "./redux/Store";
import { Provider } from "react-redux";
import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:4000/v1/'
axios.defaults.baseURL = "https://ejam-test-backend.herokuapp.com/v1/";
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
