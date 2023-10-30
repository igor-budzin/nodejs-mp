import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { HttpStatuses } from '../utils/httpStatuses';

export class ProductsController {
  #productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.#productsService = productsService;
  }

  async getPorducts(req: Request, res: Response) {
    const products = await this.#productsService.findMany();

    res.json({
      data: products,
      error: null
    });
  }

  async getPorduct(req: Request, res: Response) {
    const product = await this.#productsService.findOne(req.params.id);

    res
      .status(HttpStatuses.OK)
      .json({
        data: product,
        error: null
      });
  }
}