import Joi from 'joi';
import { UpdateCartDto } from './updateCart.dto';

export const validationSchema = Joi.object<UpdateCartDto>({
  productId: Joi.string()
    .required(),

  count: Joi.number()
    .integer()
    .min(0)
    .required(),
})
  .required()
