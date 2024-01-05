import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePasswordDto {
  @ApiProperty({
    description: 'email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'email can not be empty' })
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
