import Axios from 'axios';
import cookie from 'cookie';
import { refreshUUID } from './helper';
import { authConfig, appConfig } from './config';

const { platform } = appConfig;

const instance = Axios.create({
  baseURL: 'https://leetcode.cn',
  timeout: 10000,
  headers: {
    platform,
    referer: 'https://leetcode.cn',
    origin: 'https://leetcode.cn',
    'content-type': 'application/json',
    Accept: '*/*',
    'Accept-Encoding': 'gzip',
    timeStamp: Date.now(),
  },
});

instance.interceptors.request.use((config) => {
  const headers = config.headers || {};
  let { session } = authConfig;
  const uuid = refreshUUID();
  headers.uuUserId = 'IOS_' + uuid;
  if (session) headers.cookie = `LEETCODE_SESSION=${session};`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('请求错误', error);
    return Promise.reject(error);
  }
);

export default instance;
