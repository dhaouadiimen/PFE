import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react' 
import axios from 'axios'; 
import discussion from './discussion.css'

export default function Discussion({discussion,currentUser}) {

   const [account,setAccount]=useState({});
   const PF= process.env.REACT_APP_PUBLIC_FOLDER;
 useEffect(()=>{
   const friendId = discussion.parts.find((m) => m!==currentUser._id);
   const getAccount = async ()=>{
     try{
      const res = await axios.get("http://localhost:3000/account/"+friendId);
       console.log("friendUseer",res);
       setAccount(res.data.Account);
     }
     catch(err){
      console.log("err");
    }
  }
  getAccount()
 },

 [currentUser,discussion])


  return (
    <div className="discussion">
      <img
      src={account?.profilePicture ? account.profilePicture: PF+"person/noAvatar.png"}
        
        className="discussionImg"
        alt=""
      />
      <span className="discussionName">{account?.name}</span> 
    </div>
  );
}
