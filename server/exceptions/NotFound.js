export class NotFoundError extends Error {
  constructor(message) {
    super(message ?? 'Not Found');
    this.name = 'NotFound';
  }
}