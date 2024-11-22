import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axiosConfig';
import { postLogin } from './loginService';
import { regulusIp } from '../config/config';
import { ResponseHandler } from './responseHandler';
import { ApiFactory } from '../factory/apiFactory';
import { parseAcerValue } from './xmlParserService';
import { AbstractApiInterface } from './abstractApiInterface';
import { UnAuthorizedError } from '../exception/unAuthorizedError';
import { IllegalStatusError } from '../exception/illegalStatusError';
import { registryMapper } from '../mapper/registryMapper';

export class ApiService implements AbstractApiInterface {
  async update(page: string, body: any): Promise<AxiosResponse> {
    const apiUrl = `${regulusIp}${page}`;
    const bodyObj = this.objectToUrlSearchParams(body);
    return await axiosInstance.post(apiUrl, bodyObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async fetch(page: string): Promise<AxiosResponse> {
    const apiUrl = `${regulusIp}${page}`;
    return await axiosInstance.get(apiUrl);
  }

  async execute(operation: () => Promise<AxiosResponse>, handler: ResponseHandler): Promise<any> {
    try {
      const response = await operation();

      if (response.status === 200) {
        return handler.getResponseData(response.data);
      }

      if (response.status === 302) {
        console.log('Redirect detected, re-authenticating...');
        let loginStatus = 302;
        let redirectUrl = response.headers.location || '';
        let count = 1;
        while (count < 10 && loginStatus === 302 && redirectUrl === '/LOGIN.XML') {
          try {
            let loginResponse = await postLogin();
            loginStatus = loginResponse.status;
            if (loginStatus === 200 && loginResponse!.data) {
              const acerValue = await parseAcerValue(loginResponse!.data);

              if (acerValue === '1') {
                throw new UnAuthorizedError();
              } else {
                throw new IllegalStatusError('Acer value not supported !!');
              }
            }
            redirectUrl = loginResponse.headers.location || '';
            console.log('Login, redirect to ' + redirectUrl);
          } catch (error) {
            throw error;
          }
          count++;
        }
        return await ApiFactory.redirectTo(redirectUrl);
      }
    } catch (err) {
      throw err;
    }
  }
  private objectToUrlSearchParams(reqBody: any): URLSearchParams {
    const bodyObj = new URLSearchParams();
    for (const [key, value] of Object.entries(reqBody)) {
      const registryName = registryMapper.get(key)!;
      if (value !== undefined) {
        if (typeof value === 'boolean') {
          value ? '1' : '0';
        }
        bodyObj.append(registryName, String(value));
      }
    }
    return bodyObj;
  }
}
