import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req): { access_token: string } {
    console.log(req.user);
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user, 'aaaa');

    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req) {}

  @Get('redirect/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req) {
    console.log(req.user);

    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  facebookAuth() {}
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/redirect')
  facebookAuthRedirect(@Request() req) {
    return req.user;
  }

  @UseGuards(TwitterAuthGuard)
  @Get('twitter')
  twitterAuth() {}
  @UseGuards(TwitterAuthGuard)
  @Get('twitter/redirect')
  twitterAuthRedirect(@Request() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  githubAuth() {}
  @UseGuards(GithubAuthGuard)
  @Get('github/redirect')
  githubAuthRedirect(@Request() req) {
    return req.user;
  }
}
