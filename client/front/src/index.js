import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {io} from "socket.io-client";
import { AutoRefreshDiscussion } from './Redux/Actions/discussion';
import { AutoRefreshMessage } from './Redux/Actions/listeMessage';
import {useDispatch } from 'react-redux';

const dispatch = useDispatch();

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
  
});
 //when disconnect 
socket.on('disconnect', function() {
  console.log('a user disconnected'); 
  
});/* 
socket.on('removeUser', function(data) {  
  console.log('dataaaaaaaaaaaaaaaaaa', data);
}); */
/* socket.emit("removeUser",{
  
}); */

socket.emit("addUser",{
  accountId :  "62752a322047424709a53c05",
});

socket.on('events', function(data) {
  
  console.log("--------------------------------------dataaaaaaaaaaaaaaaNotif",data);
  NotificationManager.success(data.newmsj.content, data.newmsj.senderId);

  // Notif +++++++++++++++++++++++++++ Refresh msjt ///////////////////////////////////
  
  dispatch(AutoRefreshDiscussion(data));
  dispatch(AutoRefreshMessage());
});

socket.on('eventsupdated', function(data) {
  //dispatch(AutoRefreshDiscussion(data));
  //dispatch(AutoRefreshMessage(data.listemessagesBydiscussion));
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