import { useContext, useState } from "react";
import "./Topbar.css";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Modaladdmessage from "../Modal/Modaladdmessage";
import { useEffect } from "react";

export default function Topbar() {
  const [modalisopen,setIsopenModal]=useState(false);
  
  const {account} =useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

useEffect(()=>{
})
  const addNewmessage = async (e) => {
    /* setModal(true);
    <Modaladdmessage></Modaladdmessage> */
    alert("hhhhhhhhhhhhhhh")
    };
    
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
       
          <span className="logo">InMailing</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for candidate"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
         
          <div className="icon-add">
           

          
          </div>
          <Modaladdmessage close={()=>setIsopenModal(false)} open={modalisopen}></Modaladdmessage>
          <div>
          </div>
        </div>
          { <img
            src={
              account._id.profilePicture
                ? PF + account._id.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          /> }
        {
          <h6>
            <span>{account.surname}</span>
          </h6>
        }
      </div>
    </div>
  );
}
