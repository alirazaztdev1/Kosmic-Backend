import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilitiesService } from 'src/helpers/utils';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly _jwtService: JwtService,
    private helper: UtilitiesService
  ) {}

  async login(userCredentials: LoginDto) {
    const encodePass = this.helper.encodePassword(userCredentials.password);
    const user: any = await this.userService.getUserByEmail(userCredentials);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const isPasswordValid = this.helper.isPasswordValid(userCredentials.password, user.password);

    if (!isPasswordValid) throw new HttpException('invalid email/password', HttpStatus.CONFLICT);

    const token: string = await this._jwtService.signAsync(
      { user },
      { secret: process.env.JWT_SECRET_KEY }
    );

    const responseWithToken = { ...user, token };

    const userWithoutPassword = this.helper.excludeOnlyPwd(responseWithToken);
    return userWithoutPassword;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, oldPassword, newPassword } = changePasswordDto;

    const find: any = await this.userService.getUserByEmail(changePasswordDto);
    if (find.password != oldPassword) {
      throw new HttpException('Invalid old password', HttpStatus.CONFLICT);
    }
    await this.userService.savePassword(newPassword, email);
  }
}
