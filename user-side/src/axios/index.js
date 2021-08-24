import axios from 'axios'
import {api} from './urlConfig'
import store from '../store';

const token = localStorage.getItem('token');
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

axiosIntance.interceptors.request.use((req) =>{
  const {auth} = store.getState();
  if(auth.token){
    req.headers.Authorization  = `Bearer ${auth.token}`
  }
  return req;
})
export default axiosIntance;