import axios from "axios";
import {getSessionCookie} from "../Config/SessionCookie";


export const axiosInstance = axios.create({
  baseURL: process.env["REACT_APP_API_BASE_URL"],
  headers: {
    Authorization: "token",
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(function (config) {
    const session = getSessionCookie();
    let token="";
    // console.log("in axios ");
    if(Object.keys(session).length!==0){
        // console.log("in axios with token", session.token);
        token="Bearer "+session.token;
        config.headers['Authorization'] = token;
    }
    return config;
},function(error) {
    return Promise.reject(error);
});
