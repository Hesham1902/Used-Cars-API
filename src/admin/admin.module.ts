import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/reports/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Report])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
