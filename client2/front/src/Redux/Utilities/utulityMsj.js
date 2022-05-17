import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { MessageService } from '../../Services/messagesService';
import { AutoRefreshMessage } from '../Actions/listeMessage';
export const GetMessage = async (dispatch,discussionId) =>{    
    const resp = await MessageService(discussionId);
    console.log("ressssssspp",resp)
    if(resp.status===200){
        console.log("okkkkkk");
     dispatch(AutoRefreshMessage(resp.data.listemessagesBydiscussion))
      }
  //return  RefreshListemsj();
}
 
 
 