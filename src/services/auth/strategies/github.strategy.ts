import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { github } from '../constants/github';
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: github().clientID,
      clientSecret: github().clientSecret,
      callbackURL: 'http://localhost:3000/auth/github/redirect',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    try {
      done(null, profile);
    } catch (error) {
      console.log(error);
    }
  }
}
