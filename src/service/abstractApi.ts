import { AbstractApiInterface } from './abstractApiInterface';
import { ResponseHandler } from './responseHandler';

export abstract class AbstractApi {
  constructor(protected abstractApiInterface: AbstractApiInterface) {}

  abstract page: string;
  abstract handler: ResponseHandler;

  fetch(): Promise<any> {
    return this.abstractApiInterface.execute(() => this.abstractApiInterface.fetch(this.page), this.handler);
  }
  update(body: any): Promise<any> {
    return this.abstractApiInterface.execute(() => this.abstractApiInterface.update(this.page, body), this.handler);
  }
}
