import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

const axiosServices = axios.create({
  baseURL: 'https://mock-data-api-nextjs.vercel.app/',
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      // window.location.pathname = "/login";
    }
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error');
    } else {
      toast.error(error.response?.data?.data?.message);
    }
    if (error.code === 'TOKEN_EXPIRED') {
      //todo refesh-token
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
