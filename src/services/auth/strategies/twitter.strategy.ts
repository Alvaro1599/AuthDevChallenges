import { twitter } from '../constants/twitter';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-twitter';
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: twitter().clientID,
      consumerSecret: twitter().clientSecret,
      callbackURL: 'http://localhost:3000/auth/twitter/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
