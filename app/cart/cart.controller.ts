import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { HttpStatuses } from '../utils/httpStatuses';
import { validationSchema } from './validationSchema';
import { ValidationError } from '../exceptions/ValidationError';
import { UpdateCartDto } from './updateCart.dto';

export class CartController {
  #cartService: CartService;

  constructor(cartService: CartService) {
    this.#cartService = cartService;
  }

  async getCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as UUID;
    const cart = await this.#cartService.findOne(userId);

    res
      .status(HttpStatuses.OK)
      .json({
        data: cart,
        error: null
      });
  }

  async deleteCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as UUID;
    await this.#cartService.delete(userId);

    res
      .status(HttpStatuses.OK)
      .json({
        data: { success: true },
        error: null
      });
  }

  async updateCart(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as UUID;
    const params = req.body;

    const { error, value } = validationSchema.validate(params);

    if (error) {
      throw new ValidationError(error.message);
    }

    const updatedCart = await this.#cartService.update(userId, value as UpdateCartDto);

    res
      .status(HttpStatuses.OK)
      .json({
        data: updatedCart,
        error: null
      });
  }
}