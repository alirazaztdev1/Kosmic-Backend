import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'user email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: '*****'
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  @IsString()
  password: string;
}
