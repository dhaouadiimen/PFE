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
socket.on('connect', function(client) {
  console.log('a user connected');
  console.log("firsssssssssst",client)
  
});
//when disconnect 
socket.on('disconnect', function() {
  console.log('a user disconnected');
});



socket.emit("addUser",{
  accountId :  "62752a282047424709a53c03",
});

// ecoute sur channel events 
socket.on('events', function(data) {
  console.log("--------------------------------------dataaaaaaaaaaaaaaaNotif",data)
  NotificationManager.success(data.newmsj.content, data.newmsj.senderId);
});




console.log("sockeeeeeeeeeeeeet",socket.Socket);
//console.log("Socket",socket.id);


ReactDOM.render(
  <React.StrictMode>
   <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')

);


reportWebVitals();


/* 


  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    //recuperer account 
    const account = getUser(receiverId);
    //send msj to this account
    io.to(account.socketId).emit("getMessage", {
      senderId,
      content,
    });
 */