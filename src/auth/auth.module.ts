import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from './token/token.module';
import { MailModule } from 'src/mail/mail.module';
import { GoogleModule } from './socials/google/google.module';
import { PasswordService } from './password/password.service';
import { ForgotModule } from './forgot/forgot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    TokenModule,
    MailModule,
    ForgotModule,
    GoogleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
