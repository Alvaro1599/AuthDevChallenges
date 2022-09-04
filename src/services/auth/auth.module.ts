import { jwt } from './constants/jwt';
import { UserModule } from '../../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { CommonModule } from '../../common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { MapperService } from '../../common/mappers/mappers.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    CommonModule,
    JwtModule.register({
      secret: jwt().secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    TwitterStrategy,
    GithubStrategy,
  ],
})
export class AuthModule {}
