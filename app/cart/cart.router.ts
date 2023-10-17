import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { validationSchema } from './validationSchema';
import { ValidationError } from '../exceptions/ValidationError';
import { UpdateCartDto } from './updateCart.dto';
import { cartService } from '../dependencies.container';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  const cart = cartService.findOne(userId);

  res
    .status(HttpStatuses.OK)
    .json({
      data: cart,
      error: null
    });
});

cartRouter.delete('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  cartService.delete(userId);

  res
    .status(HttpStatuses.OK)
    .json({
      data: { success: true },
      error: null
    });
});

cartRouter.put('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  const params = req.body;

  const { error, value } = validationSchema.validate(params);

  if (error) {
    throw new ValidationError(error.message);
  }

  const updatedCart = cartService.update(userId, value as UpdateCartDto);

  res
    .status(HttpStatuses.OK)
    .json({
      data: updatedCart,
      error: null
    });
});

export default cartRouter;
