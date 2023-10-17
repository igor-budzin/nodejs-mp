export class EntityAlreadyExist extends Error {
  constructor(message?: string) {
    super(message ?? 'Entity Already Exist');
    this.name = 'EntityAlreadyExist';
  }
}