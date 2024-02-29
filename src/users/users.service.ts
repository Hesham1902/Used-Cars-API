import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    // return this.repo.findOne({ where: { id } });
    return this.repo.findOneBy({ id });
  }

  //   async update(id: number, updateUserDto: UpdateUserDto) {
  // return this.repo.update({ id }, updateUserDto);
  //   }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
