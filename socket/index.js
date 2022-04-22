const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:8000",
    }
});
io.on("connection", (socket) => {
console.log("conected to socket server");
io.emit("welcome","this is a socket server");
//io.to(si).emit("welcome",hello);
});
//send and get message 
socket.on("sendMessage",({account,receiverId,content})=>{
    
})
