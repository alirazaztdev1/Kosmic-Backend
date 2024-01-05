import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { UtilitiesService } from 'src/helpers/utils';
import { User, Profile } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from '../otp/otp.service';
import { Otp } from 'src/entities/otp.entity';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile, Otp])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, UtilitiesService, OtpService]
})
export class UsersModule {}
