import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { logoutStart } from '../redux/slices/auth-slice';
import { store } from '../redux/store';
import { DEFAULT_API_URL } from 'config';
// const debounce = require('lodash.debounce');

type CustomRequestOptions = AxiosRequestConfig & {
  isAuthentication?: boolean;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
// axios client side
export class AxiosCSRequest {
  private instance: AxiosInstance;
  constructor(baseURL: string, version?: string) {
    this.instance = axios.create({
      baseURL: `${baseURL}${version ? version : ''}`,
    });

    this.instance.interceptors.request.use(this.beforeRequest, this.beforeRequestError);

    this.instance.interceptors.response.use(this.handelSuccess, this.handelError);
  }

  beforeRequest(config: CustomRequestOptions) {
    // const accessToken = localStorage.getItem('serviceToken');

    // if (accessToken) {
    //   config = {
    //     ...config,
    //     headers: {
    //       ...config.headers,
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   };
    // }
    return config as any;
  }

  beforeRequestError(error) {
    return Promise.reject(error);
  }

  handelSuccess(response) {
    return response.data;
  }

  handelError = async (error) => {
    if (error?.response?.status === 401 && !window.location.href.includes('/login')) {
      // store.dispatch(logoutStart(''));
      // localStorage.removeItem('serviceToken');
      // window.location.pathname = '/login';
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
  };

  async get(endpoint, options: CustomRequestOptions = {}): Promise<any> {
    return await this.instance.get(endpoint, options);
  }

  async post(endpoint, body, options: CustomRequestOptions = {}): Promise<any> {
    return this.instance.post(endpoint, body, options);
  }

  async put(endpoint, body, options: CustomRequestOptions = {}): Promise<any> {
    return this.instance.put(endpoint, body, options);
  }

  async patch(endpoint, body, options: CustomRequestOptions = {}): Promise<any> {
    return this.instance.patch(endpoint, body, options);
  }

  async delete(endpoint, options: CustomRequestOptions = {}): Promise<any> {
    return this.instance.delete(endpoint, options);
  }

  async postFormData(path: string, body) {
    const res = await this.instance.post(path, body, {
      headers: { ...defaultHeaders, 'Content-Type': 'multipart/form-data' },
    });
    return res;
  }
}

export const axiosRequest = new AxiosCSRequest(DEFAULT_API_URL || '');
