import { HttpStatuses } from '../utils/httpStatuses.js';
import { Utils } from '../utils/utils.js';

export class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  getUsers(req, res) {
    res.statusCode = HttpStatuses.OK;
    res.end(JSON.stringify(this.repository.findMany()));
  }

  getUser(req, res) {
    const urlParts = req.url.trim('/').split('/');
    const id = parseInt(urlParts[2], 10);

    res.statusCode = HttpStatuses.OK;
    res.end(JSON.stringify(this.repository.findOne(id)));
  }

  async createUser(req, res) {
    const body = await Utils.processBody(req);
    const user = this.repository.create(JSON.parse(body));

    res.statusCode = HttpStatuses.CREATED;
    res.end(JSON.stringify(user));
  }

  deleteUser(req, res) {
    const urlParts = req.url.trim('/').split('/');
    const id = parseInt(urlParts[2], 10);

    this.repository.delete(id);
    res.statusCode = HttpStatuses.OK;
    res.end();
  }

  async updateUser(req, res) {
    const urlParts = req.url.trim('/').split('/');
    const id = parseInt(urlParts[2], 10);
    const body = await Utils.processBody(req);

    const user = this.repository.update(id, JSON.parse(body));
    res.statusCode = HttpStatuses.OK;
    res.end(JSON.stringify(user));
  }
}
