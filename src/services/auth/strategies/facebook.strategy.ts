import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';
import { facebook } from '../constants/facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: facebook().clientID,
      clientSecret: facebook().clientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos,
      accessToken,
    };

    done(null, user);
  }
}
