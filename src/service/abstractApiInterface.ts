import { AxiosResponse } from 'axios';
import { ResponseHandler } from './responseHandler';

export interface AbstractApiInterface {
  fetch(page: string): Promise<any>;
  update(page: string, body: Map<string, string>): Promise<any>;
  execute(operation: () => Promise<AxiosResponse>, handler: ResponseHandler): Promise<any>;
}
