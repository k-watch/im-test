import axios from 'axios';

const httpInstance = axios.create({
  baseURL: 'https://december-and-company.herokuapp.com/',
});

export default httpInstance;
