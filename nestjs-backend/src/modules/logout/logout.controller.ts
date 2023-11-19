import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { LogoutService } from './logout.service';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Get()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const logout = await this.logoutService.logout(refreshToken);
    res.clearCookie('refreshToken');

    return logout;
  }
}
