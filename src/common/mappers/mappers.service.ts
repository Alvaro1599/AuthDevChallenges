import { social } from './../../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Profile as profileGoogle } from 'passport-google-oauth20';
import { Profile as profileFacebook } from 'passport-facebook';
import { Profile as profileGithub } from 'passport-github2';
import { Types } from 'mongoose';

@Injectable()
export class MapperService {
  constructor() {}
  spliceName(fullName: string) {
    let fullNameArray: string[] = fullName.split(' ');
  }
  socialResponse(
    info: profileGoogle | profileFacebook | profileGithub,
    social?: social,
  ) {
    return {
      [social ? social + 'ID' : 'id']: info.id,
      email: info.emails ? info.emails[0].value : undefined,
      name: info.displayName ? info.displayName : info.username,
      bio: undefined,
      phone: undefined,
    };
  }

  jwtPayload(user: User & { _id: Types.ObjectId }) {
    return {
      id: user.id,
      email: user.email ? user.email : null,
      name: user.name,
      bio: user.bio,
      phone: user.phone,
    };
  }
}
