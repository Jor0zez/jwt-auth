import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    next();
  }
}
