import { AxiosResponse } from 'axios';
import { AbstractApi } from './abstractApi.js';
import axiosInstance from '../config/axiosConfig.js';
import { host } from '../config/config.js';
import { registryMapper } from '../mapper/registryMapper.js';

export abstract class UpdateAbstractApi<U extends Record<string, unknown>, T> extends AbstractApi<T> {
  update(body: U): Promise<T> {
    return this.execute(() => this.updateImpl(this.page, body));
  }

  updateImpl(page: string, body: U): Promise<AxiosResponse> {
    const apiUrl = `${host}${page}`;
    const bodyObj = this.objectToUrlSearchParams(body);
    return axiosInstance.post(apiUrl, bodyObj, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  private objectToUrlSearchParams(reqBody: U): URLSearchParams {
    const bodyObj = new URLSearchParams();
    for (const [key, value] of Object.entries(reqBody)) {
      const registryName = registryMapper.get(key)!;
      if (value !== undefined) {
        const stringValue = typeof value === 'boolean' ? (value ? '1' : '0') : String(value);
        bodyObj.append(registryName, stringValue);
      }
    }
    return bodyObj;
  }
}
