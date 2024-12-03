import { BadRequestError } from './badRequestError.js';

export class UnknownApiTypeError extends BadRequestError {
  constructor(redirect: string) {
    super(`Unknown API redirect page: ${redirect}`);
  }
}
