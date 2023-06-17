import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Req,
  Response,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Response({ passthrough: true }) res) {
    return this.authService.login(req, res);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: `${createUserDto.username} created successfully`,
      };
    } catch (error) {
      return error;
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return req.user;
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user: any = await this.authService.googleLogin(req);
    return res.redirect(
      `http://localhost:3001/login?accessToken=${user.access_token}&refreshToken=${user.refresh_token}`,
    );
  }

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
    return req.user;
  }

  @Get('auth/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.authService.facebookLogin(req);
  }

  @Post('refresh')
  async refreshToken(
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<{
    accessToken: string;
  }> {
    const cookies = req.cookies;
    const token = await this.authService.refreshToken(
      cookies.refresh_token,
      res,
    );
    return token;
  }
}
