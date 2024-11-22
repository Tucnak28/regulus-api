export class UnAuthorizedError extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = 401;
  }
}
