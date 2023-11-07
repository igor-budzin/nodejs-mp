export class InvalidCredentials extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Credentials');
    this.name = 'InvalidCredentials';
  }
}