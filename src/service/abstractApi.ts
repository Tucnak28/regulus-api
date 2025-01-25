import { AxiosResponse } from 'axios';
import { LoginService } from './loginService.js';
import { host } from '../config/config.js';
import axiosInstance from '../config/axiosConfig.js';
import { parseXmlToMap } from './xmlParserService.js';
import { ConflictError } from '../exception/conflictError.js';
import { Response, NextFunction } from 'express';

export abstract class AbstractApi<T> {
  abstract page: string;

  async routeFetch(res: Response, next: NextFunction) {
    try {
      const data = await this.fetch();
      return data;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw new ConflictError(error.message);
      } else {
        throw error;
      }
    }
  }

  fetch(): Promise<T> {
    const apiUrl = `${host}${this.page}`;
    return this.execute(() => axiosInstance.get(apiUrl));
  }

  async execute(operation: () => Promise<AxiosResponse>): Promise<T> {
    let response: AxiosResponse;

    while (true) {
      response = await operation();
      if (response.status === 200) {
        return this.getResponse(response.data);
      }
      console.log('Redirect detected, re-authenticating...');
      await LoginService.successLogin(response);
    }
  }

  async getResponse(data: string): Promise<T> {
    const schemaXmlMap = await parseXmlToMap(data);
    const registryErrors: string[] = [];

    const response = this.generateResponse(schemaXmlMap, registryErrors);

    if (registryErrors.length > 0) {
      throw new ConflictError(registryErrors.join('|'));
    }

    return response;
  }

  abstract generateResponse(schemaXmlMap: Map<string, string>, registryErrors: string[]): T;
}
