import { HttpModule } from '@nestjs/axios/dist';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UtilitiesService } from 'src/helpers/utils';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, //enter secret key from the config file
      signOptions: { expiresIn: '8h' }
    })
  ],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    // RefreshTokenStrategy,
    UtilitiesService
  ],

  controllers: [AuthController]
})
export class AuthModule {}
