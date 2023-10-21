import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { orderService } from '../dependencies.container';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  const order = await orderService.create(userId);

  res
    .status(HttpStatuses.OK)
    .json({
      data: order,
      error: null
    });
});

export default orderRouter;
