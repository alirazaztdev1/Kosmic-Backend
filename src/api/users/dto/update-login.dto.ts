import { LoginDto } from '../../auth/dto/login.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLoginDto extends PartialType(LoginDto) {}
