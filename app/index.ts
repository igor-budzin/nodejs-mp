import express from 'express';

import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/auth.middleware';
import productsRouter from './products/product.router';
import cartRouter from './cart/cart.router';
import orderRouter from './order/order.router';
import userRouter from './user/user.router';
import { connectDb } from './db/data-source';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', userRouter);
app.use(authMiddleware);
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);
app.use(errorHandler);

connectDb()
  .on('error', console.log)
  .once('open', () => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  });