export class EntityAlreadyExist extends Error {
  constructor(message) {
    super(message ?? 'Entity Already Exist');
    this.name = 'EntityAlreadyExist';
  }
}