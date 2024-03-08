import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  findAllUsers() {
    return this.userRepo.find();
  }

  async findAllReports() {
    return await this.reportRepo.find();
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.userRepo.findOneBy({ id });
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Not found report');
    }
    report.approved = approved;
    return this.reportRepo.save(report);
  }
  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }
}
