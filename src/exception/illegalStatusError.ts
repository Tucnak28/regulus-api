import { BadRequestError } from './badRequestError';

export class IllegalStatusError extends BadRequestError {
  constructor(message: string) {
    super(message);
  }
}
