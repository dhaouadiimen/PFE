import { Button } from 'react-bootstrap';
import { useState } from 'react' 
import { Modal,Form } from "react-bootstrap";
import {AuthContext} from "../../../src/context/AuthContext"; 
import { useContext, useEffect, useRef } from "react";
import axios from 'axios';
import './Modaladdmessage.css'
import './Modaladdmessage.css'
export default function Modaladdmessage() {
  const {account} =useContext(AuthContext); 
  const [show, setShow] = useState(false);
  const [newMessage,setNewMessage]=useState("");
  const [receiver,setReceiver]=useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlesendmsj = async (e) => {
    e.preventDefault();
    const newMsj={
      senderId:account._id,
      receiverId:receiver,
      content: newMessage,
    };
    
    try{
      console.log("receiverId",newMsj.receiverId)
      console.log("SenderId",newMsj.senderId)
      console.log("ccc",newMsj.content)
      //alert('gggggggggg')
      const res = await axios.post("http://localhost:3000/message/add/new",newMsj);
      console.log(res.data);
      setNewMessage("");
      setShow(false);
    }catch(err){
console.log(err);
    }
   
  };
  return (
    <>
 <svg   onClick={handleShow}
          xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" class="bi bi-plus-circle"
               viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>


      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
    <Modal.Title>Start new Chat      
  
    </Modal.Title>
  <svg className="svg" xmlns="http://www.w3.org/2000/svg" 
  width="18" height="18"
  viewBox="0 0 16 16">
  <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 
  1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 
  3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>
  </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Receiver </Form.Label>
              <Form.Control
                type="email"
                placeholder="account@example.com"
                autoFocus
                onChange={(e) => setReceiver(e.target.value)}  value={receiver}
              />
             
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setNewMessage(e.target.value)}  value={newMessage} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='btnsend' onClick={handlesendmsj}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
