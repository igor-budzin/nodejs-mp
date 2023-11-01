import mongoose from 'mongoose';
import { connectDb } from '../data-source';
import { SeedService } from './seed.service';

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', async () => {
    try {
      const seeder = new SeedService();
      await seeder.run();
      console.log('Finished');
    }
    catch (e) {
      console.log(e)
    }
  });
