import Axios from 'axios';
import cookie from 'cookie';
import { refreshUUID } from './helper';
import { authConfig, authCookie, appConfig } from './config';

const { version, platform } = appConfig;

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
    version,
  },
});

instance.interceptors.request.use((config) => {
  const headers = config.headers || {};
  const { csrftoken } = authCookie;
  let { access_token } = authConfig;
  const uuid = refreshUUID();
  headers.uuUserId = 'IOS_' + uuid;
  if (access_token) headers.Authorization = `Bearer ${access_token}`;
  if (csrftoken) headers.cookie = `csrftoken=${csrftoken};`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const cookieRes = response.headers['set-cookie'] || [];

    const errors = response?.data?.errors;
    if (errors) {
      return Promise.reject(errors);
    }

    if (cookieRes.length) {
      cookieRes.forEach((value) => {
        const curCookie = cookie.parse(value.replace(/;.*/g, ''));
        if (
          curCookie['csrftoken'] &&
          curCookie['csrftoken'] !== authCookie.csrftoken
        ) {
          authCookie.csrftoken = curCookie.csrftoken;
        }
      });
    }
    return response.data;
  },
  (error) => {
    console.log('请求错误', error);
    return Promise.reject(error);
  }
);

export default instance;
