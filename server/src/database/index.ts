import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('📦 DB is ready!'))
  .catch((err) => console.log(err));
