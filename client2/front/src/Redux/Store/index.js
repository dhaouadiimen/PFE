
import storage from 'redux-persist/lib/storage' 
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer, REHYDRATE } from "redux-persist";
import axios from "axios";
import { createLogger } from "redux-logger";
import { discussionReducer } from '../Reducer/discussion';
import { profileReducer } from '../Reducer/profile';
import { listeMessageReducer } from '../Reducer/listeMessage';
export const persistConfig = {
  key: 'root',
  whitelist: [''],
  storage:storage,
  version: 1,
    blacklist: []
  };
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      discussion:discussionReducer,
      profile:profileReducer,
      listemessagesBydiscussion:listeMessageReducer
      
    })
  );
  export const logger = createLogger({});
  export const store = createStore(persistedReducer, applyMiddleware(logger));
  
  export const persistor = persistStore(store);
  export async function cleanStore() {
    await persistor.purge();
    await persistor.flush();
    await persistor.persist();
    await store.dispatch({
      type: REHYDRATE,
    });
  }

  export const getState = () => {
    return store.getState()}
  export default {
    store,
    getState,
    persistor,
  };

 /*
 import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Reducer/discussion'

export default configureStore({
  reducer: {
    discussion: discussionReducer
  }
})*/ 