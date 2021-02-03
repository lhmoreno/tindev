import axios from 'axios';

const api = axios.create({
  baseURL: 'YOU_LOCALHOST:3333'
});

export default api;
