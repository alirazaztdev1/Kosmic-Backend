import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'email',
    example: 'abc@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'otp',
    example: 123456
  })
  @IsNotEmpty({ message: 'otp can not be empty' })
  @IsNumber()
  otp: number;
}
