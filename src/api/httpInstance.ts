import axios from 'axios';

const BASE_URL = 'https://k-dnc.vercel.app';

const httpInstance = axios.create({
   baseURL: BASE_URL,
});

export default httpInstance;
