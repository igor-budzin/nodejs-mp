import { AppDataSource } from '../data-source';
import { SeedService } from './seed.service';

AppDataSource.initialize()
  .then(async () => {
    try {
      const seeder = new SeedService(AppDataSource);
      await seeder.run();
      console.log('Finished');
    }
    catch (e) {
      console.log(e)
    }
  })
  .catch(console.log);

