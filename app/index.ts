import express from 'express';
import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/auth.middleware';
import productsRouter from './products/product.router';
import cartRouter from './cart/cart.router';
import orderRouter from './order/order.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
