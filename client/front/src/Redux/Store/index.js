
import storage from 'redux-persist/lib/storage' 
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer, REHYDRATE } from "redux-persist";
import axios from "axios";
import { createLogger } from "redux-logger";
import { profileReducer } from '../Reducer/profile';

export const persistConfig = {
  key: 'root',
  whitelist: ['profile'],
  storage:storage,
  version: 1,
    blacklist: []
  };
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      profile:profileReducer,
      
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