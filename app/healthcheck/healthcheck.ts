import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  if (mongoose.connection.readyState) {
    res
      .status(200)
      .json({ status: 'OK' });
  }
  else {
    res
      .status(500)
      .json({ status: 'NOT OK' });
  }
});

export default router;
