import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axiosConfig.js';
import { host } from '../config/config.js';
import { parseAcerValue } from './xmlParserService.js';
import { UnAuthorizedError } from '../exception/unAuthorizedError.js';
import { IllegalStatusError } from '../exception/illegalStatusError.js';

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

  public static async successLogin(response: AxiosResponse): Promise<string> {
    let loginStatus = response.status;
    let redirectUrl = response.headers.location || '';
    let count = 1;
    while (count < 10 && loginStatus === 302 && redirectUrl === '/LOGIN.XML') {
      const loginResponse = await this.postLogin();
      loginStatus = loginResponse.status;
      if (loginStatus === 200 && loginResponse.data) {
        await this.validateLoginStatus(loginResponse.data);
      }
      redirectUrl = loginResponse.headers.location || '/home.xml';
      console.log('Logged in and redirect to ' + redirectUrl);
      count++;
    }
    return redirectUrl;
  }

  private static async validateLoginStatus(data: string) {
    const acerValue = await parseAcerValue(data);

    if (acerValue === '1') {
      throw new UnAuthorizedError();
    } else {
      throw new IllegalStatusError();
    }
  }
}
