import  axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";



const onRequest = (config: InternalAxiosRequestConfig | any): InternalAxiosRequestConfig => {
    const { method, url } = config;

    return config;
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
    if (response && response.data) {
        return response.data;
    }
    return response;
};
const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
   
    return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
instance.defaults.baseURL = 'http://link-to-json-serve';

instance.defaults.paramsSerializer = (params) => {
    return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};
instance.interceptors.request.use(onRequest, onErrorResponse);
instance.interceptors.response.use(onResponse, onErrorResponse);

return instance;
};

const axiosInstance = axios.create();
export const axiosClient = setupInterceptors(axiosInstance);