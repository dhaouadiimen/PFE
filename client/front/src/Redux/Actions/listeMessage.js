import storage from 'redux-persist/lib/storage';
import {PURGE} from 'redux-persist';
import { Refresh } from '@material-ui/icons';
export const Refresh_Msj = 'Refresh_Msj';

export const AutoRefreshMessage= (listemessagesBydiscussion) => ({
  type:Refresh_Msj,
  payload: {listemessagesBydiscussion},
});