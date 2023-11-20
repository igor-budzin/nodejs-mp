import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  if (mongoose.connection.readyState) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
  }
  else {
    res
      .status(500)
      .json({ status: 'NOT OK' });
  }
});

export default router;
