import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

// import { UpdateUserDto } from './dtos/update-user.dto

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.findOneBy({ email });
  }

  findOne(id: number) {
    // return this.repo.findOne({ where: { id } });
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  // return this.repo.update({ id }, updateUserDto);
  //   }
}
