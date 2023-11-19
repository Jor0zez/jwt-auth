import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshService } from './refresh.service';

@Controller('refresh')
export class RefreshController {
  constructor(private readonly refreshService: RefreshService) {}

  @Get()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await this.refreshService.refresh(refreshToken);
      res.cookie('refreshToken', `${tokens.refreshToken}`, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return tokens;
    } catch (err) {
      return err;
    }
  }
}
