import { AppError } from './appError.js';

export class ConflictError extends AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
