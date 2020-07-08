import React from 'react';
import ReactDOM from 'react-dom';
import './App/Layout/styles.css';
import App from './App/Layout/App';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './App/Layout/ScrollToTop';
import 'mobx-react-lite/batchingForReactDom'

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>

  </BrowserRouter>

  ,
  document.getElementById('root')
);


