import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import registerDto from './dtos/register.dto';
import { RegisterService } from './register.service';

@Controller('registration')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async Register(
    @Res({ passthrough: true }) res: Response,
    @Body() RegisterData: registerDto,
  ) {
    console.log('123123123');
    const register = await this.registerService.register(RegisterData);
    res.cookie('refreshToken', `${register.refreshToken}`, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return register;
  }
}
