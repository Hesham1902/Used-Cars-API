import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get('/users')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('/user/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/user/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
