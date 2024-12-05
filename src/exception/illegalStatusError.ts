import { BadRequestError } from './badRequestError.js';

export class IllegalStatusError extends BadRequestError {
  constructor() {
    super('Unspecific authorization error !!');
    Object.setPrototypeOf(this, IllegalStatusError.prototype);
  }
  
}
