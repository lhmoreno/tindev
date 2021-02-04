import axios from 'axios';

const api = axios.create({
  baseURL: 'http://YOU_LOCALHOST:3333'
});

export default api;
