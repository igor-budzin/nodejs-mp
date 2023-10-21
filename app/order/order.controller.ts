import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { HttpStatuses } from '../utils/httpStatuses';

export class OrderController {
  #orderService: OrderService;

  constructor(orderService: OrderService) {
    this.#orderService = orderService;
  }

  async createOrder(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as UUID;
    const order = await this.#orderService.create(userId);

    res
      .status(HttpStatuses.OK)
      .json({
        data: order,
        error: null
      });
  }
}