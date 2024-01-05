import { ROLE_TYPE } from 'src/constants';
import { IsString, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: string;
}
