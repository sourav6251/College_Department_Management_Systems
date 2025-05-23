// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000/api/v1",
//     // baseURL:"",
//     withCredentials: true,
    
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

// Request interceptor to dynamically set Content-Type
axiosInstance.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

export default axiosInstance;