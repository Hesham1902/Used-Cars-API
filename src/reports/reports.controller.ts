import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetEstimateDto, ReportDto, CreateReportDto } from './dto/index';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiCookieAuth()
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @ApiOperation({ summary: 'Get Estimation for car value' })
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query);
  }

  @Serialize(ReportDto)
  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Serialize(ReportDto)
  @Get('/:id')
  getReport(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.reportService.getOne(id, user);
  }
}
