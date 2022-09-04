import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  Request,
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { LoginUserDto } from './dto/loginUser';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req): { access_token: string } {
    return this.authService.login(req.user);
  }

  @Post('register')
  async Register(
    @Body() req: LoginUserDto,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    return await this.authService.register(req);
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
    return await this.authService.socialLogin(req.user, 'google');
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  facebookAuth() {}
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/redirect')
  async facebookAuthRedirect(@Request() req) {
    return await this.authService.socialLogin(req.user, 'facebook');
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  githubAuth() {}
  @UseGuards(GithubAuthGuard)
  @Get('github/redirect')
  async githubAuthRedirect(@Request() req) {
    return await this.authService.socialLogin(req.user, 'github');
  }
}
