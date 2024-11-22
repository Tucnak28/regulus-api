import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axiosConfig';
import { regulusIp } from '../config/config';

interface LoginData {
  USER: string;
  PASS: string;
}

export async function postLogin(): Promise<AxiosResponse> {
  const user = process.env.USER;
  const password = process.env.PASSWORD;

  const loginData: LoginData = { USER: `${user}`, PASS: `${password}` };
  const URL = `${regulusIp}/login.xml`;

  return await axiosInstance.post(URL, loginData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxRedirects: 0,
  });
}
