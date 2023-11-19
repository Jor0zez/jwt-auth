import { Injectable } from '@nestjs/common';
import { JWTService } from 'src/services/jwt/jwt.service';

@Injectable()
export class LogoutService {
  constructor(private readonly jwtService: JWTService) {}

  async logout(refreshToken: string) {
    await this.jwtService.logout(refreshToken);
  }
}
