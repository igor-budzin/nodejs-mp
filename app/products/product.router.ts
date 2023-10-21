import express from 'express';
import { productsController } from '../dependencies.container';

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => productsController.getPorducts(req, res));
productsRouter.get('/:id', (req, res) => productsController.getPorduct(req, res));

export default productsRouter;
