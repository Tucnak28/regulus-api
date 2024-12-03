import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();
const cookiePlcName = 'SoftPLC';
export let softPLCCookie: string | null = null;

axiosInstance.interceptors.response.use(
  (response) => {
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      softPLCCookie = getCookieValue(cookies, cookiePlcName);
      if (softPLCCookie) {
        axiosInstance.defaults.headers.Cookie = softPLCCookie;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.maxRedirects = 0;
    config.validateStatus = (status: number) => status == 200 || status == 302;

    if (!config.headers) {
      config.headers = {};
    }
    if (softPLCCookie) {
      config.headers['Cookie'] = softPLCCookie;
    }
    config.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml';

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

const getCookieValue = (setCookieArray: string[], cookieName: string): string => {
  let newCookie = '';
  for (const setCookie of setCookieArray) {
    const cookieArray = setCookie.split(';');
    for (const cookie of cookieArray) {
      if (cookie.startsWith(cookieName)) {
        newCookie = cookie;
      }
    }
  }

  return newCookie;
};

export default axiosInstance;
