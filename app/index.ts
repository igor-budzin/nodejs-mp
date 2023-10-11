import express from 'express';
import productsRouter from './products/product.router';
import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/auth.middleware';
import cartRouter from './cart/cart.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
