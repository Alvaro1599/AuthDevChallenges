import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { MapperService } from '../../common/mappers/mappers.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { social, UserService } from '../../user/user.service';
import {} from 'crypto';
import { HashAdapter } from '../../common/hash/hash.adapter';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Types } from 'mongoose';
import { ResponseSocial } from './interface/response';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashAdapter: HashAdapter,
    private readonly mapperService: MapperService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user: User = await this.userService.findByEmail(email);

    if (user && (await this.hashAdapter.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    let formatUser: User = user._doc;
    const payload = { userId: formatUser._id, email: formatUser.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async socialLogin(profile: ResponseSocial, social: social) {
    const userCurrent = this.mapperService.socialResponse(profile);
    const isItRegistered = await this.userService.findBySocial(
      userCurrent.id,
      social,
    );

    if (!isItRegistered) {
      let user = await this.userService.createSocialUser(profile, social);
      return {
        access_token: this.jwtService.sign(this.mapperService.jwtPayload(user)),
      };
    }
    return {
      access_token: this.jwtService.sign(
        this.mapperService.jwtPayload(isItRegistered),
      ),
    };
  }
}
