import axios from 'axios';

const httpInstance = axios.create({
  baseURL: 'https://k-dnc.vercel.app',
});

export default httpInstance;
