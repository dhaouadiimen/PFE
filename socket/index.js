
import { io } from "socket.io-client";
//socket server : io 




let users = [];

const addUser = (accountId, socketId) => {
  !users.some((account) => account.accountId === accountId) &&
    users.push({ accountId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((account) => account.socketId !== socketId);
};

const getUser = (accountId) => {
  return users.find((account) => account.accountId === accountId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (accountId) => {
    addUser(accountId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    //recuperer account 
    const account = getUser(receiverId);
    //send msj to this account
    io.to(account.socketId).emit("getMessage", {
      senderId,
      content,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});