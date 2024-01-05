import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { OtpModule } from './api/otp/otp.module';
import { ProfileModule } from './api/profile/profile.module';
import { UsersModule } from './api/users/users.module';
import { AppController } from './app.controller';
import { TypeOrmConfigService } from './core/providers/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    AuthModule,
    OtpModule,
    ProfileModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
