import axios from 'axios';
import * as Api from './api';
const Instance = axios.create({
    baseURL: Api.baseUrl,
    timeout: 2000
});

Instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token;
    return config;
});

export default Instance;