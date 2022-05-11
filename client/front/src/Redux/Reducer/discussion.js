import { PURGE } from "redux-persist/lib/constants";
import Discussion from "../../components/discussions/Discussions";
import { Refresh_Discu} from "../Actions/discussion";
//import {Messenger} from "../../pages/Messenger/Messenger.jsx"
//0679136800 

const initialState = {discussion: null };

export function discussionReducer(state = initialState, action) {
  console.log("action",action)
  if (typeof state === 'undefined') {
    return initialState
}
  switch (action.type) { 
    case Refresh_Discu:
      return {
       ...state,
        discussion: action.payload.discussion
      };
    case PURGE:
      return {};
    default:
      return state;
  }
}
