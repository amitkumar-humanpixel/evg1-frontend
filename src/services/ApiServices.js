/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  clearAuthTokenFromLocalStorage,
  clearUserDetailsFromLocalStorage,
  getAuthTokenFromLocalStorage,
} from '../helpers/LocalStorageHelper';
import { errorNotification } from '../components/common/NotifyToaster';

const instance = axios.create({
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    const token = getAuthTokenFromLocalStorage();
    const userId = localStorage.getItem('userDetails');
    if (token.accessToken.accessToken) {
      config.headers.authorization = `Bearer ${token.accessToken.accessToken}`;
    }
    config.headers.crossOrigin = true;
    config.headers.userId = userId;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const ApiService = {
  request(config = {}) {
    return instance.request(config);
  },
  getData(url, config = {}) {
    return instance.get(url, config);
  },
  postData(url, data, config) {
    return instance.post(url, data, config);
  },
  putData(url, data, config) {
    return instance.put(url, data, config);
  },
  deleteData(url, config = {}) {
    return instance.delete(url, config);
  },
};

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const statusCode = error?.response?.status ?? 0;
    switch (statusCode) {
      case 401:
        /* handle 401 here */
        errorNotification('Token Expired');
        clearUserDetailsFromLocalStorage();
        clearAuthTokenFromLocalStorage();
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
        return false;
      case 403:
        /* handle 403 here */
        // window.location.href = '/forbidden-access';
        return false;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default ApiService;
