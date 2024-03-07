import { config } from 'dotenv';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

config();

console.log(process.env.DB_NAME);

let configs;

switch (process.env.NODE_ENV) {
  case 'development' || 'test':
    console.log('in dev case');
    configs = new DataSource({
      type: 'sqlite',
      database: process.env.DB_NAME,
      entities: [User, Report],
      migrations: ['migrations/**'],
      synchronize: false,
    });
    break;
  case 'production':
    console.log('in prod case');
    configs = new DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Report],
      migrations: ['migrations/**'],
      migrationsRun: true,
    });
    break;
}

export default configs;
