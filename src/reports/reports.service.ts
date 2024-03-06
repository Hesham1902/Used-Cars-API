import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-reprot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@ApiBearerAuth()
@ApiTags('Reports')
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });
    return this.repo.save(report);
  }
  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Not found report');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
  async getOne(id: number, user: User) {
    const report = await this.repo.findOne({
      where: { id, user },
      relations: ['user'],
    });
    if (!report) {
      throw new NotFoundException(
        `No reports for this user: ${user.email} with this id ${id}`,
      );
    }
    return report;
  }
}
