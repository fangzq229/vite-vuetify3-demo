import axios, { AxiosRequestConfig } from 'axios';

export function curl(config: AxiosRequestConfig) {
  const defaultConf = {
    baseURL: import.meta.env.BASE_URL,
    timeout: import.meta.env.REQUERT_TIMEOUT,
    headers: {
      token: '',
    },
  };
  // 配置项合并
  const service = axios.create(defaultConf);

  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    (res) => {
      console.log(res);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return service(config);
}
