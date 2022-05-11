import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import Websocket from './websocket'
import { io } from "socket.io-client";
ReactDOM.render(

  <React.StrictMode>
      <AuthContextProvider>
  <App />
 
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')

);
reportWebVitals();

