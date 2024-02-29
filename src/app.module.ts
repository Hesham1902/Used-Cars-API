import { Module } from '@nestjs/common';
import { ReportsController } from './reports/reports.controller';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [UsersController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
