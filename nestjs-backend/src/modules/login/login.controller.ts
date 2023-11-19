import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import loginDto from './dtos/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginData: loginDto,
  ) {
    try {
      const login = await this.loginService.login(loginData);
      res.cookie('refreshToken', `${login.refreshToken}`, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return login;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
