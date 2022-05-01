import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {io} from "socket.io-client";
const socket = io("http://localhost:3000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});
 //when connect
socket.on('connect', function() {
  console.log('a user connected');
});
 //when disconnect 
socket.on('disconnect', function() {
  console.log('a user disconnected');
});

  socket.on('events', function(data) {

  NotificationManager.success('message', 'msj');
  //'Close after 1000ms'
  console.log('even1', data);

  
});  

ReactDOM.render(
  <React.StrictMode>
   <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
