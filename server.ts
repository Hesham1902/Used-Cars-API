import { Report } from 'src/reports/report.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

const appDataSource = new DataSource({
  // type: 'sqlite',
  // database: 'db.sqlite',
  // entities: [User, Report],
  // synchronize: true,
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Report],
  synchronize: true,
});

const createAdmin = async (dataSource: DataSource) => {
  await dataSource.initialize();
  const repo = dataSource.getRepository(User);
  let thereAdmin = await repo.findOne({ where: { admin: true } });
  if (!thereAdmin) {
    const salt = await await bcrypt.genSalt();
    const hash = await bcrypt.hash('test123', salt);
    thereAdmin = await repo.create({
      email: 'admin@a.com',
      password: hash,
      admin: true,
    });
    console.log('Admin User Created', thereAdmin);
    return repo.save(thereAdmin);
  }

  console.log('There is Admin User already ===> ', thereAdmin);
  return thereAdmin;
};

createAdmin(appDataSource);
