import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'email can not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'oldPassword',
    example: '*****'
  })
  @IsNotEmpty({ message: 'old password can not be empty' })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'password',
    example: '*****'
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  @IsString()
  newPassword: string;
}
