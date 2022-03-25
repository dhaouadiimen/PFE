import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react' 
import axios from 'axios'; 
import discussion from './discussion.css'

export default function Discussion({discussion,currentUser}) {
   const[account,setAccount]=useState(null);
 
  useEffect(()=>{
    const friendId = discussion.parts.find((p) => p !== currentUser._id);
    const getAccount = async()=>{
      try{
        //get account bel id 
        const res = await axios("/account/accountId" + friendId);
        console.log((res));
      }
      catch(err){
console.log(err);
      }
    }
    getAccount();
  }
  ,[currentUser,discussion]); 
  return (
    <div className="discussion">
      <img 
      // src={account?.profilePicture?account.profilePicture: "person/noAvatar.png"}
      src={require('../../assets/person/5.jpeg')} 
        className="discussionImg"
        alt=""
      />
      <span className="discussionName">{account?.name}</span>
    </div>
  )
}
