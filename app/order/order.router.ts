import express from 'express';
import { orderController } from '../dependencies.container';

const orderRouter = express.Router();

orderRouter.post('/', (req, res) => orderController.createOrder(req, res));

export default orderRouter;
