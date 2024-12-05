import { AppError } from "./appError.js";

export class BadRequestError extends AppError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
