import { PURGE } from "redux-persist/lib/constants";
import { PROFILE_PERSIST} from "../Actions/profile";


const initialState = {
  profile: {_id:"624aecb3975cf8f5dfeb5e13",surname:"imen dhaouadi"}
};
export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_PERSIST:
      return {
        ...state,
        profile: action.payload.profile
      };
    case PURGE:
      return {};
    default:
      return state;
  }
  
}