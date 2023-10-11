import express from 'express';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { HttpStatuses } from '../utils/httpStatuses';

const productsRouter = express.Router();
const repository = new ProductsRepository();
const service = new ProductsService(repository);

productsRouter.get('/', (req, res) => {
  const products = service.findMany();

  res.json({
    data: products,
    error: null
  });
});

productsRouter.get('/:id', (req, res) => {
  const product = service.findOne(req.params.id);

  res
    .status(HttpStatuses.OK)
    .json({
      data: product,
      error: null
    });
});

export default productsRouter;
