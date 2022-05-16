import { PURGE } from "redux-persist/lib/constants";
import { Refresh_Msj} from "../Actions/listeMessage";
import axios from 'axios'; 
//0679136800 

const initialState = {listemessagesBydiscussion: [] };

const  getMessages = async () => {
  try {
    const res = await axios.get("http://localhost:3000/message/62752bb06681e4cd5428fb39");
    console.log("resss",res.data);
    return res 

  } catch (err) {
    console.log(err);
  }
};
export function listeMessageReducer(state = initialState, action) {

if(action.type===Refresh_Msj)
{
  getMessages();
};


  console.log("action",action)
  switch (action.type) { 
    case Refresh_Msj:
      return {
       listemessagesBydiscussion: action.payload.listemessagesBydiscussion,
      };
    case PURGE:
      return {};
    default:
      return state;
  }
  
  
}
