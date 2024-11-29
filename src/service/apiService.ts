import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axiosConfig';
import { LoginService } from './loginService';
import { host } from '../config/config';
import { ResponseHandler } from './responseHandler';
import { ApiFactory } from '../factory/apiFactory';
import { AbstractApiInterface } from './abstractApiInterface';
import { registryMapper } from '../mapper/registryMapper';

export class ApiService implements AbstractApiInterface {
  update(page: string, body: any): Promise<AxiosResponse> {
    const apiUrl = `${host}${page}`;
    const bodyObj = this.objectToUrlSearchParams(body);
    return axiosInstance.post(apiUrl, bodyObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  fetch(page: string): Promise<AxiosResponse> {
    const apiUrl = `${host}${page}`;
    return axiosInstance.get(apiUrl);
  }

  execute(operation: () => Promise<AxiosResponse>, handler: ResponseHandler): Promise<AxiosResponse> {
    return operation()
      .then((response) => {
        if (response.status === 200) {
          return handler.getResponseData(response.data);
        }
        return this.redirectTo(response);
      })
      .catch((err) => {
        throw err;
      });
  }

  private async redirectTo(response: AxiosResponse): Promise<AxiosResponse> {
    console.log('Redirect detected, re-authenticating...');
    const redirectUrl = await LoginService.successLogin(response);
    return ApiFactory.redirectTo(redirectUrl);
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
