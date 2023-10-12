import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { productService } from '../dependencies.container';

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  const products = productService.findMany();

  res.json({
    data: products,
    error: null
  });
});

productsRouter.get('/:id', (req, res) => {
  const product = productService.findOne(req.params.id);

  res
    .status(HttpStatuses.OK)
    .json({
      data: product,
      error: null
    });
});

export default productsRouter;
