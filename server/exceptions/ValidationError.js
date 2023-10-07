export class ValidationError extends Error {
  constructor(message) {
    super(message ?? 'Validation Error');
    this.name = 'ValidationError';
  }
}