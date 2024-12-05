import { AppError } from "./appError.js";

export class UnAuthorizedError extends AppError {
  statusCode: number;
  constructor() {
    super('Unauthorized access !!');
    this.statusCode = 401;
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
}
