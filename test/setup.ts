import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  console.log(
    `environment: ${process.env.NODE_ENV}, on Database: ${process.env.DB_NAME}`,
  );
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
