import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UtilitiesService } from 'src/helpers/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [OtpService],
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService, JwtService, UtilitiesService]
})
export class OtpModule {}
