import { BadRequestError } from './badRequestError';

export class UnknownApiTypeError extends BadRequestError {
  constructor(redirect: string) {
    super(`Unknown API redirect page: ${redirect}`);
  }
}
