import axios from 'axios';
import {authInstance,isAuthInstance} from '../Config/axios-instance';
import {getMessageUrl} from '../Urls';

export async function MessageService(id) {
    try {
      const response = await isAuthInstance.get(getMessageUrl(id));
      console.log("**********",response)
      return response;
    } catch (error) {
      console.log('resp errro====>', error);
      return error;
    }
  }