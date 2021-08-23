import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_API_URL
});

export default axiosClient;