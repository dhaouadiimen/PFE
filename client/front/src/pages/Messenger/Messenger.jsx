import React from 'react'
import Discussion from '../../components/discussions/Discussions'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import './Messenger.css'
import {AuthContext} from "../../context/AuthContext" ;
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'; 
export default function Messenger() {
  const {account} = useContext(AuthContext);
  const [discussion,setDiscussions]=useState([]);
  const [currentChat,setCurrentChat]=useState([]);
  const [messages,setMessages]=useState([]);
    //get all discu of user connected 
  useEffect(()=>{
    const getDiscussions= async ()=>{
          try{
           // /discussions/accountId
            const res= await axios.get("discussions/"+account._id);
            //console.log(res);
            setDiscussions(res.data);
          }
          catch(err){
            console.log(err);
          }
    }
    getDiscussions();
  },[account._id]);

 useEffect(()=>{
   const getMessages= async ()=> {
     try{
      const res=await axios.get("/messages/" + currentChat?._id);
      setMessages(res.data); //update messages 
     }
     catch(err){
       console.log(err);
     }
   }
   getMessages();
 },[currentChat]);
 
 

//console.log(this.currentChat);
console.log(messages);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for chat" className="chatMenuInput" />
            
             {discussion.map((d) => (
             <div onClick={()=>
               setCurrentChat(d)
             }>
                 <Discussion discussion={d} currentUser={account} />
               </div>
              
            
            ))} 
            
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                  
                      <Message message={m} own={m.sender === account._id} />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                  ></textarea>
                  <button className="chatSubmitButton" >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}