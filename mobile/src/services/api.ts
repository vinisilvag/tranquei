import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tranquei-server.herokuapp.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
