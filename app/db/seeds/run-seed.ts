import { connectDb } from '../data-source';
import { SeedService } from './seed.service';

connectDb()
  .on('error', console.log)
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
