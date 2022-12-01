import axios from 'axios';

const httpInstance = axios.create({
  baseURL: 'https://december-and-company.herokuapp.com',
  timeout: 5000,
});

export default httpInstance;
