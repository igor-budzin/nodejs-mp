import express from 'express';
import { cartController } from '../dependencies.container';
import { isAdmin } from '../middlewares/isAdmin.middleware';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => cartController.getCart(req, res));
cartRouter.delete('/', isAdmin, (req, res) => cartController.deleteCart(req, res));
cartRouter.put('/', (req, res) => cartController.updateCart(req, res));

export default cartRouter;
