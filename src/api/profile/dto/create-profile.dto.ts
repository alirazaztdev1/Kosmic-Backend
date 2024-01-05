import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GENDER } from 'src/constants';

export class CreateProfileDto {
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
    description: 'phone number',
    example: '565465454343'
  })
  @IsNotEmpty({ message: 'phone number cannot be empty' })
  @IsString({ message: 'phone number must be string' })
  phoneNumber: string;

  @ApiProperty({
    type: 'enum',
    description: 'gender',
    example: 'MALE'
  })
  @IsNotEmpty({ message: 'gender cannot be empty' })
  @IsEnum(GENDER)
  gender: string;

  @ApiProperty({
    type: 'date',
    description: 'dob'
  })
  @IsNotEmpty({ message: 'dob cannot be empty' })
  @IsString({ message: 'dob must be string' })
  dob: string;

  @ApiProperty({
    type: 'string',
    description: 'address',
    example: 'College Road, Gujranwala'
  })
  @IsNotEmpty({ message: 'address cannot be empty' })
  @IsString({ message: 'address must be string' })
  address: string;
}
