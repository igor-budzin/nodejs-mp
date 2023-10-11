import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { validationSchema } from './validationSchema';
import { ValidationError } from '../exceptions/ValidationError';
import { UpdateCartDto } from './updateCart.dto';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';

const cartRouter = express.Router();

const productRepository = new ProductsRepository();
const productService = new ProductsService(productRepository)
  ;
const repository = new CartRepository();
const service = new CartService(repository, productService);


cartRouter.get('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  const cart = service.findOne(userId);

  res
    .status(HttpStatuses.OK)
    .json({
      data: cart,
      error: null
    });
});

cartRouter.delete('/', (req, res) => {
  const userId = req.headers['x-user-id'] as UUID;
  repository.delete(userId);

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

  const updatedCart = service.update(userId, value as UpdateCartDto);

  res
    .status(HttpStatuses.OK)
    .json({
      data: updatedCart,
      error: null
    });
});

export default cartRouter;
