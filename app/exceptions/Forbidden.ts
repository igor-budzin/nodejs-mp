export class Forbidden extends Error {
  constructor(message?: string) {
    super(message ?? 'Forbidden');
    this.name = 'Forbidden';
  }
}
