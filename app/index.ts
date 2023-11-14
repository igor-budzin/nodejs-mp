import express from 'express';

import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/auth.middleware';
import productsRouter from './products/product.router';
import cartRouter from './cart/cart.router';
import orderRouter from './order/order.router';
import userRouter from './user/user.router';
import { connectDb } from './db/data-source';
import { Socket } from 'node:net';

const app = express();
const port = process.env.PORT || 3000;
let connections: Socket[] = [];

const dbConnection = connectDb()
  .on('error', console.log);

app.use(express.json());
app.use('/api/auth', userRouter);
app.use(authMiddleware);
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

server.on('connection', (connection) => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
  console.log('Closing connections...')

  server.close(() => {
    dbConnection.close().then(() => process.exit(0));
    console.log('Closed out remaining connections');
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
