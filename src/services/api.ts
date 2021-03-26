import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trinus-api.herokuapp.com/',
});

export default api;
