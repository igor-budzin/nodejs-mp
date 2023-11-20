import 'dotenv/config';
import { connectDb } from '../data-source';
import { SeedService } from './seed.service';

console.log('process.env.', process.env.MONGO_INITDB_ROOT_USERNAME)
const connection = connectDb()
  .on('error', console.log)
  .once('open', async () => {

    console.log('open', process.env.MONGO_INITDB_ROOT_USERNAME)
    try {
      const seeder = new SeedService();
      await seeder.run().then(() => {
        console.log('Finished');
        connection.close();
      });
    }
    catch (e) {
      console.log(e)
    }
  });
