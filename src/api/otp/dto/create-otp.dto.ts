import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({
    description: 'email',
    example: 'abc@user.com'
  })
  @IsEmail()
  email: string;
}
