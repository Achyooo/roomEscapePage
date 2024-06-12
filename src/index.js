import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { legacy_createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducers } from './modules';
import { createLogger } from 'redux-logger';


import ScrollToTop from './libs/common/ScrollToTop';


const logger = createLogger();
const store = legacy_createStore(rootReducers, applyMiddleware(logger))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
