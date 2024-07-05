import Axios from 'axios';
import { refreshUUID } from './helper';
import { Config } from './config';

const { platform, version } = Config.get();

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
    version,
    timeStamp: Date.now(),
  },
});

instance.interceptors.request.use((config) => {
  const headers = config.headers || {};
  let { session, authorization } = Config.get();

  const uuid = refreshUUID();
  headers.uuUserId = 'IOS_' + uuid;
  if (authorization) {
    headers.Authorization = authorization;
  }
  if (session) {
    headers.cookie = session;
  }
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
