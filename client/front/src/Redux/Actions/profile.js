import storage from 'redux-persist/lib/storage';
import {PURGE} from 'redux-persist';
export const PROFILE_PERSIST = 'PROFILE_PERSIST';
export function getPersistedProfile(profile) {
  return {
    type: PROFILE_PERSIST,
    payload: {profile},
  };
}