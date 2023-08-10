import axios from 'axios';
import router from "./router.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_bASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = '1234';
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401 ) {
        router.navigate('login')
        return error;
    }
    throw error;
})
export default axiosClient;
