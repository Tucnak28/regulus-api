export class UnknownApiTypeError extends Error {
  statusCode: number;
  constructor(redirect: string) {
    super(`Unknown API redirect page: ${redirect}`);
    this.statusCode = 400;
  }
}
