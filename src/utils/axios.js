import axios from 'axios';
export const axiosRequest = axios.create({
    baseURL:process.env.REACT_APP_SERVER,
    headers:{
        ["Content-Type"]: "application/json"
    },
});

axiosRequest.interceptors.request.use(function (config) {
    return config;
})