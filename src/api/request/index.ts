import axios, { AxiosRequestHeaders } from 'axios';
import storage from '@/utils/storage';

const toastErrorMsg = (msg: string) => {
//   toast({
//     title: msg,
//     status: 'error',
//     position: 'top'
//   })
}
export const request = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
  timeout: 60000,
});

request.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = storage.getItem('token');
      console.log('token:', token)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },

  () => {
    throw new Error('发起请求出错');
  }
);

request.interceptors.response.use(
  (data) => {
    const res = data.data
    if (!/2\d{2}/.test(res.code)) {
        toastErrorMsg(res.message);
      return res.message
    }

    return res.data;
  },
  (err) => {
    console.log('err data:', err)
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
          typeof window !== 'undefined' && toastErrorMsg('服务器异常');
          break;
        case 400:
          toastErrorMsg(err.response.data.message)
          break;
        case 401:
          console.log('sssh')
          toastErrorMsg(err.response.data.message)
          break;

        default:
          typeof window !== 'undefined' &&
            toastErrorMsg(
              (err.response && err.response.data && err.response.data.msg) || '未知错误!'
            );
      }
    }

    return Promise.reject(err);
  }
)