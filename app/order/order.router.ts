import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { cartService, orderService } from '../dependencies.container';

const orderRouter = express.Router();

orderRouter.post('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  const order = orderService.create(userId);

  res
    .status(HttpStatuses.OK)
    .json({
      data: order,
      error: null
    });
});

export default orderRouter;
