import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axiosConfig';
import { host } from '../config/config';
import { parseAcerValue } from './xmlParserService';
import { UnAuthorizedError } from '../exception/unAuthorizedError';
import { IllegalStatusError } from '../exception/illegalStatusError';

interface LoginData {
  USER: string;
  PASS: string;
}

export class LoginService {

  private static URL = `${host}/login.xml`;

  public static async postLogin(): Promise<AxiosResponse> {
    const user = process.env.USER;
    const password = process.env.PASSWORD;

    const loginData: LoginData = { USER: `${user}`, PASS: `${password}` };

    const response = await axiosInstance.post(this.URL, loginData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  }

  public static async getLogin(): Promise<AxiosResponse> {
    return await axiosInstance.post(this.URL);
  }

  public static async successLogin(response: AxiosResponse): Promise<string> {
    let loginStatus = response.status;
    let redirectUrl = response.headers.location || '';
    let count = 1;
    while (count < 10 && loginStatus === 302 && redirectUrl === '/LOGIN.XML') {
      try {
        let loginResponse = await this.postLogin();
        loginStatus = loginResponse.status;
        if (loginStatus === 200 && loginResponse.data) {
          this.validateLoginStatus(loginResponse.data);
        }
        redirectUrl = loginResponse.headers.location || '/home.xml';
        console.log('Logged in and redirect to ' + redirectUrl);
      } catch (error) {
        throw error;
      }
      count++;
    }
    return redirectUrl;
  }

  private static async validateLoginStatus(data: string) {
    const acerValue = await parseAcerValue(data);

    if (acerValue === '1') {
      throw new UnAuthorizedError();
    } else {
      throw new IllegalStatusError('Unspecific authorization error !!');
    }
  }
}