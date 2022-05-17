import { PURGE } from "redux-persist/lib/constants";
import { Refresh_Msj} from "../Actions/listeMessage";
import axios from 'axios'; 
//0679136800 

const initialState = {listemessagesBydiscussion: [] };


export function listeMessageReducer(state = initialState, action) {
 
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
