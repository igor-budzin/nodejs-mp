import { UserRepository } from './users/user.repository.js';
import { UserController } from './users/user.controller.js';

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

export const routes = [
  {
    matcher: (req) => req.method === 'GET' && req.url === '/users',
    routeProccessor: (req, res) => userController.getUsers(req, res)
  },
  {
    matcher: (req) => req.method === 'GET' && req.url.match(/^\/users\/\d+$/),
    routeProccessor: (req, res) => userController.getUser(req, res)
  },
  {
    matcher: (req) => req.method === 'POST' && req.url === '/users',
    routeProccessor: (req, res) => userController.createUser(req, res)
  },
  {
    matcher: (req) => req.method === 'DELETE' && req.url.match(/^\/users\/\d+$/),
    routeProccessor: (req, res) => userController.deleteUser(req, res)
  },
  {
    matcher: (req) => req.method === 'PUT' && req.url.match(/^\/users\/\d+$/),
    routeProccessor: (req, res) => userController.updateUser(req, res)
  },
];
