import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './interceptors'
import axios from 'axios';
import { Provider } from "react-redux";
import storeFactory from "./redux/store";

const reduxStore = storeFactory();

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={reduxStore}>
      <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
