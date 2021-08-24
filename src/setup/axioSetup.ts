import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import {apiUrl} from '../constant/developemnt'
const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);
    axiosInstance.defaults.baseURL = apiUrl;
    /*
        Add default headers, interceptors etc..
    */

    return axiosInstance;
};

export default initialization;