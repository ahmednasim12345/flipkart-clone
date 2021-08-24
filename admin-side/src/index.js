import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store'
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);
