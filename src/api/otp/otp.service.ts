import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOT_FOUND_RESPONSE } from 'src/constants';
import { Otp } from 'src/entities/otp.entity';
import { UtilitiesService } from 'src/helpers/utils';
import { Repository } from 'typeorm';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  constructor(
    private readonly helper: UtilitiesService,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>
  ) {}

  async generateOtp(generataOtpDto: CreateOtpDto): Promise<any> {
    const { email } = generataOtpDto;
    const otp: number = this.helper.generateOtp();
    const data = await this.otpRepository.upsert(
      [
        {
          email,
          expiryTime: this.helper.generateFutureDate(30),
          otp
        }
      ],
      ['email']
    );

    return { message: `Otp Sent Successfully ${otp}` };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<boolean> {
    const { email, otp } = verifyOtpDto;
    const otpField = await this.otpRepository.findOne({ where: { email } });
    if (!otpField) {
      throw new HttpException(NOT_FOUND_RESPONSE.message, HttpStatus.NOT_FOUND);
    }
    if (!this.isOtpExpired(otpField.expiryTime)) {
      return otpField.otp === otp;
    } else {
      throw new HttpException('Otp has been expired', HttpStatus.OK);
    }
  }

  isOtpExpired(expirationTime: Date): boolean {
    return expirationTime.getTime() < new Date().getTime();
  }
}
