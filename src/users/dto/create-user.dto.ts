import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'mail@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234578910',
    required: true,
  })
  @IsString()
  password: string;

  // @IsOptional()
  // @IsBoolean()
  // admin?: boolean;
}
