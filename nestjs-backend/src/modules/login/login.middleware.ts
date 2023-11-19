import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { login, password } = req.body;

    if (!login || !password) {
      throw new HttpException('Data are required', 400);
    }
    if (login.length < 3 || password.length < 3) {
      throw new HttpException('Data are required', 400);
    }

    next();
  }
}
