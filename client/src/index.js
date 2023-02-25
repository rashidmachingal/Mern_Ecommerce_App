import { Provider } from 'react-redux';
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} pauseOnHover theme="light" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
