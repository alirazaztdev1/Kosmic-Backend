import { Injectable, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ILike, Not } from 'typeorm';

@Injectable()
@Global()
export class UtilitiesService {
  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // media type check
  public checkMediaType = (args) => {
    console.log('args:', args);
  };

  public replacingAlies(data) {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        this.replacingAlies(data[key]);
      } else if (key === 'ILike') {
        data = { ...data, [key]: ILike(`%${data[key]}%`) };
      } else if (key === 'Not') {
        data = { ...data, [key]: Not(`%${data[key]}%`) };
      }
    }
    return data;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Generate JWT Token
  public generateToken(user): string {
    return this.jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        time: new Date().toUTCString(),
        expiry: 86400000
      },
      { secret: process.env.JWT_SECRET_KEY }
    );
  }
  // Decode and verify JWT Token
  public async decodeToken(token: string): Promise<any> {
    const verifyToken = await this.jwt?.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY
    });
    return verifyToken;
  }
  // abstract token from header
  public async abstractToken(req: any): Promise<any> {
    const currentToken = await req.header('authorization');
    const token: string = currentToken.split('Bearer ')[1];
    return token;
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public isOtpValid(Otp: string, userOtp: string): boolean {
    return bcrypt.compareSync(Otp, userOtp);
  }

  public generatePassword() {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  public addMinutes(numOfMinutes, date = new Date()): Date {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
  }
  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public encodeOtp(otp: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(otp, salt);
  }

  // remove the password from the objects of array
  public excludePassword(users: any[]) {
    const data = [];
    for (const user of users) {
      const { password, ...rest } = user;
      data.push(rest);
    }
    return data;
  }
  // this method will paginate the data
  public paginateResponse(data: any, page?: number, limit?: number) {
    const [result, total] = data;
    const totalPages = Math.ceil(total / limit);
    // const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > totalPages ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: [...result],
      metaInfo: {
        totalRecords: total,
        itemsPerPage: result.length,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        totalPages: totalPages
      }
    };
  }
  // remover password from single object
  public excludeOnlyPwd(user: any) {
    const data = user;
    const { password, isPasswordForgot, otpCode, otpCodeExpiry, isPasswordForgotExpiry, ...rest } =
      data;
    return rest;
  }

  // response with status code and message along with body
  public responseModifier(
    httpStatusCode: number,
    responseMessage: string,
    httpStatus: boolean,
    resp: object | Array<object>
  ) {
    const newResponse = {
      succeeded: httpStatus,
      httpStatusCode: httpStatusCode,
      message: responseMessage,
      data: resp
    };
    return newResponse;
  }

  public generateOtp() {
    let otp = Math.floor(100000 + Math.random() * 999999);
    while (`${otp}`.length < 6) {
      otp = Math.floor(100000 + Math.random() * 999999);
    }
    return otp;
  }

  public generateFutureDate(minutes: number) {
    return new Date(new Date().getTime() + minutes * 60000);
  }

  // public async sendOtp(phoneNumber, otp) {
  //   const accountSid = process.env.ACCOUNT_SID;
  //   const authToken = process.env.TWILIO_AUTH_TOKEN;
  //   const client = Twilio(accountSid, authToken);
  //   await client.messages.create({
  //     body: `Your OTP for account verification is ${otp}`,
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: phoneNumber
  //   });
  //   return 'Otp sent';
  // }

  // this function will generate random code.
  public generateRandomCode(length = 6) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&(*)_-+0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  // private async validate(token: string): Promise<boolean | never> {
  //   // const decoded: unknown = this.jwt.verify(token);

  //   // if (!decoded) {
  //   //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   // }

  //   // // const user: users = await this.validateUser(decoded);
  //   // const user: any = decoded;
  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //   // }
  //   return true;
  // }
}
