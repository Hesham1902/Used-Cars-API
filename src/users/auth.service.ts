import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
// import { randomBytes, scrypt as _scrypt } from 'crypto';
// import { promisify } from 'util';
// const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if the email in use
    const user = await this.userService.find(email);
    if (user) {
      throw new BadRequestException('E-mail in use');
    }
    // Hash the user's password

    //Option: 1)
    // // Generate a salt
    // const salt = randomBytes(8).toString('hex');
    // // Hash the salt and the password
    // const hash = (await scrypt(password, salt, 32)) as Buffer;
    // // Join the hashed result and the salt together
    // const result = salt + '.' + hash.toString('hex');

    //Option: 2)
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // Create a new user and save it
    // return the user
    return await this.userService.create(email, hash);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('E-mail not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }
    return user;
  }
}
