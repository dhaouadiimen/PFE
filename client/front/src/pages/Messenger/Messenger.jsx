//socket client : socket
import React from "react";
import Discussion from "../../components/discussions/Discussions";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import "./Messenger.css";
import { AuthContext } from "../../../src/context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AutoRefreshDiscussion } from "../../Redux/Actions/discussion";
import { AutoRefreshMessage } from "../../Redux/Actions/listeMessage";
import { connect, useSelector, useDispatch } from "react-redux";
import { GetMessage } from "../../Redux/Utilities/utulityMsj";

const Messenger = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [listemessage, setListemessage] = useState([]);
  const { account } = useContext(AuthContext);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // return all discussion from the current user
    const getdiscussions = async () => {
      try {
        console.log("", account);
        const res = await axios.get(
          "http://localhost:3000/discussions/" + account._id
        );
        console.log(res.data.ListeDiscuByAccountId);
        setDiscussions(res.data.ListeDiscuByAccountId);
      } catch (err) {
        console.log(err);
      }
    };
    getdiscussions();
  }, []);
  console.log("cureeeeeennntttt", currentChat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listemessage]);

  useEffect(() => {
    setListemessage(props.listemessagesBydiscussion)

  }, [props.listemessagesBydiscussion]);


  useEffect(() => {
    
    GetMessage(dispatch,currentChat?._id);
    /*  const  getMessages = async () => {
    try {
      //GetMessage();
      const res = await axios.get("http://localhost:3000/message/" + currentChat?._id);
      setMessages(res.data.listemessagesBydiscussion);
      console.log("lst msjjj",res.data.listemessagesBydiscussion)
    } catch (err) {
      console.log(err);
    }
  };
  getMessages(); */
  }, [currentChat]);




  useEffect(() => {
    
    //PostMessage(dispatch,currentChat?._id);
    
  
  }, [currentChat]);



  /////////////////////////////////////////////// POST MESSAGE //////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: account._id,
      content: newMessage,
      discussionId: currentChat._id,
    };

    try {
      const res = await axios.post("http://localhost:3000/message/add",message);
      setMessages([...listemessage, res.data]);
      console.log("res.dataaaaaaaaaaaaaaaaa", res.data);
      setNewMessage("");
      const response = await axios.get(
        "http://localhost:3000/message/" + currentChat?._id
      );
      setListemessage(response.data.listemessagesBydiscussion);

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search " className="chatMenuInput" />
            {discussions.map((d) => (
              <div onClick={() => setCurrentChat(d)}>
                <Discussion discussion={d} currentUser={account}></Discussion>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {listemessage.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} currentuser={account._id}></Message>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    type="text"
                    autoComplete="on"
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
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
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
  
};

const mapStateToProps = (state) => {
  const listemessagesBydiscussion = state.listemessagesBydiscussion?.listemessagesBydiscussion;
  return {
    listemessagesBydiscussion,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
