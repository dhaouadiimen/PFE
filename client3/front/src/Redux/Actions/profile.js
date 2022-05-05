import storage from 'redux-persist/lib/storage';
import {PURGE} from 'redux-persist';
export const PROFILE_PERSIST = 'PROFILE_PERSIST';

export function getPersistedProfile(profile) {
  return {
    type: PROFILE_PERSIST,
    payload: {profile},
  };
}
 export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});