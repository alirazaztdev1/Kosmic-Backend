import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, isPhoneNumber } from 'class-validator';

export class SignupUsingEmailDto {
  // First Name (Type: String, only alphabetic, spaces)

  // Last Name (Type: String, only alphabetic, spaces)

  // Phone Number (Type: String, numeric, parentheses, plus signs, hyphens, or spaces)

  // Email address (Type:example@example.com)

  @ApiProperty({
    description: 'First Name',
    example: 'Josh, Peter'
  })
  @IsNotEmpty({ message: 'First Name cannot be empty' })
  @IsString({ message: 'First Name can only include alphabetic characters and spaces' })
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Josh, Peter'
  })
  @IsNotEmpty({ message: 'Last Name cannot be empty' })
  @IsString({ message: 'Last Name can only include alphabetic characters and spaces' })
  lastName: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+1 (123) 456-7890'
  })
  @IsNotEmpty({ message: 'Phone Number cannot be empty' })
  @IsString({ message: 'Phone Number must be a string' })
  @Matches(/^[0-9 ()+-]+$/, {
    message:
      'Phone Number can only include numeric, parentheses, plus signs, hyphens, or spaces; Other characters are not involved'
  })
  @ApiProperty({
    description: 'user email',
    example: 'abc@user.com'
  })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({ message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({
    description: 'password',
    example: '*****'
  })
  @IsNotEmpty({ message: 'Password can not be empty' })
  @IsString()
  password: string;
}
