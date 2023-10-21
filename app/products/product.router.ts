import express from 'express';
import { HttpStatuses } from '../utils/httpStatuses';
import { productService } from '../dependencies.container';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const products = await productService.findMany();

  res.json({
    data: products,
    error: null
  });
});

productsRouter.get('/:id', async (req, res) => {
  const product = await productService.findOne(req.params.id);

  res
    .status(HttpStatuses.OK)
    .json({
      data: product,
      error: null
    });
});

export default productsRouter;
