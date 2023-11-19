import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogoutMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new HttpException('Data are required', 400);
    }

    next();
  }
}
