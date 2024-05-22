import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.env.apiUrl,
  //timeout: 1000,
  headers: {'Baerer': localStorage.getItem('token')},
});

export default api;
