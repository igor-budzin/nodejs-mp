import express from 'express';
import { Socket } from 'node:net';
import debug from 'debug';

import { errorHandler } from './utils/errorHandler';
import { authMiddleware } from './middlewares/auth.middleware';
import productsRouter from './products/product.router';
import cartRouter from './cart/cart.router';
import orderRouter from './order/order.router';
import userRouter from './user/user.router';
import { connectDb } from './db/data-source';
import healthcheck from './healthcheck/healthcheck';
import { requestId } from './middlewares/requestId.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';

const debugInfo = debug('app:info');

const app = express();
const port = process.env.PORT || 3000;
let connections: Socket[] = [];

const dbConnection = connectDb()
  .on('error', debugInfo)
  .on('open', () => {
    console.log(' dbConnection opened')
  });

app.use(express.json());
app.use('/healthcheck', healthcheck);
app.use(requestId);
app.use(requestLogger)
app.use('/api/auth', userRouter);
app.use(authMiddleware);
app.use('/api/products', productsRouter);
app.use('/api/profile/cart', cartRouter);
app.use('/api/profile/cart/checkout', orderRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  debugInfo(`Server running at http://localhost:${port}`);
});

server.on('connection', (connection) => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
  debugInfo('Closing connections...')

  server.close(() => {
    dbConnection.close().then(() => process.exit(0));
    debugInfo('Closed out remaining connections');
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
