import axios from 'axios';

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Replace with your base URL
    timeout:30000, // Set the timeout value in milliseconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers, authentication tokens)
        return config;
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., transform, filter)
        return response;
    },
    (error) => {
        // Handle response error here
        return Promise.reject(error);
    }
);

export default axiosInstance;