import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApproveReportDto } from 'src/reports/dto';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@ApiCookieAuth()
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: 'Approve specific report' })
  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReprot(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveReportDto,
  ) {
    return this.adminService.changeApproval(id, body.approved);
  }

  @ApiOperation({ summary: 'Get All users' })
  @Get('/users')
  findAllUsers() {
    return this.adminService.findAllUsers();
  }
  @ApiOperation({ summary: 'Get All Reports' })
  @Get('/reports')
  findAllReports() {
    return this.adminService.findAllReports();
  }

  @ApiOperation({ summary: 'Update any user data by ID' })
  @Patch('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.adminService.update(parseInt(id), body);
  }

  @ApiOperation({ summary: 'Get any user data by ID' })
  @Get('/user/:id')
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  async findUser(@Param('id') id: string) {
    const user = await this.adminService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @ApiOperation({ summary: 'Delete specific user' })
  @Delete('/user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.adminService.remove(parseInt(id));
  }
}
