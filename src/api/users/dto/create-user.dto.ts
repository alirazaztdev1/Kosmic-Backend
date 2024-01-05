import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ROLE_TYPE } from 'src/constants';

export class CreateUserDto {
  @ApiProperty({
    description: 'first name',
    example: 'John'
  })
  @IsNotEmpty({ message: 'first name cannot be empty' })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'last name',
    example: 'Doe'
  })
  @IsNotEmpty({ message: 'last name cannot be empty' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'password',
    example: '*****'
  })
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'user email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    enum: ROLE_TYPE,
    enumName: 'ROLE_TYPE'
  })
  @IsString()
  role: ROLE_TYPE;
}
