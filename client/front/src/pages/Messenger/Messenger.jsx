import React from 'react'
import Discussion from '../../components/discussions/Discussions'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import './Messenger.css'
import {AuthContext} from "../../../src/context/AuthContext"; 
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'; 
export default function Messenger() {

const [discussions,setDiscussions]=useState([]);
const [messages,setMessages]=useState([]);
const [currentChat,setCurrentChat]=useState(null);
const {account} =useContext(AuthContext); 
 useEffect(()=>{
  // return all discussion from the current user 
  const getdiscussions= async ()=>{
    try{
      console.log("",account)
      const res = await axios.get("http://localhost:3000/discussions/"+account._id);
      console.log(res.data.ListeDiscuByAccountId);
      setDiscussions(res.data.ListeDiscuByAccountId);
    }
    catch(err){
      console.log(err);
    }
    
  }
  getdiscussions();
},
[]
)
console.log("cureeeeeennntttt",currentChat);


useEffect(() => {
  const getMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/message/" + currentChat?._id);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages();
}, [currentChat]);


console.log("messageeeeeeeeeeeeeeeees",messages);



return (
  <>
    <Topbar />
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search " className="chatMenuInput" />
          {
            discussions.map((d)=>(
              <div onClick={()=>setCurrentChat(d)}>
                 <Discussion discussion={d} currentUser={account}></Discussion>
             </div>
             
         ))}
        
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
         {
           currentChat ? (
         
            <>
              <div className="chatBoxTop">
               
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  //onChange={(e) => setNewMessage(e.target.value)}
                  //value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" /* onClick={handleSubmit} */>
                  Send
                </button>
                </div>
              </>
            ) 
            :(

         <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
              )  }
   
           
    
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
        </div>
      </div>
    </div>
  </>
);
        }