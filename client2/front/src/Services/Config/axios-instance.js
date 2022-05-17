import axios from 'axios';


export const X_API_VERSION = 'WEB-CLIENT';
export const Content_Type = 'application/json';
export const ACCEPT = 'application/json';



export const BASE_URL = 'http://localhost:3000';

const baseConfig = {
  baseURL: BASE_URL,
  timeout: 30000,
};

/* const getTokenAuth=async()=>{
 
  const token= await getState().auth?.token
  console.log("token==>",token)
  return token
} 
const getTokenAuthRefrech=async()=>{
 
  const token= await getState().auth?.refresh_token
  console.log("token==>",token)
  return token
}
*/


export const authInstance = axios.create(baseConfig);
authInstance.interceptors.request.use(
  async config => {
    config.headers.common['ACCEPT'] = ACCEPT;
    config.headers.common['Content_Type'] = Content_Type;
    return config;
  },
  error => error,
);

export const isAuthInstance = axios.create(baseConfig);
isAuthInstance.interceptors.request.use(
  async config => {
    config.headers.common['ACCEPT'] = ACCEPT;
    config.headers.common['Content_Type'] = Content_Type;
    //config.headers.common['Authorization'] = `Bearer ${await getTokenAuth()}`;
    console.log("config => ",config)
    return config;
  },
  error => error,
);

isAuthInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  console.log('errorrrrr===r>',error.response.status)
  const originalRequest = error.config;
  console.log('errorrrrr==originalRequest=r>',originalRequest)
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    console.log('errorrrrrrrrrrr>')
    // = await refreshAccessToken();            
    //axios.defaults.headers.common['Authorization'] = `Bearer ${await getTokenAuthRefrech()}`;
    //return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});