import { BadRequestError } from './badRequestError.js';

export class IllegalStatusError extends BadRequestError {
  constructor(message: string) {
    super(message);
  }
}
