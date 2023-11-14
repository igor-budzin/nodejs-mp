export class InvalidToken extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Token');
    this.name = 'InvalidToken';
  }
}