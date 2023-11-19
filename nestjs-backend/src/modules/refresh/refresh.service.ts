import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTService } from '../../services/jwt/jwt.service';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class RefreshService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}

  async refresh(refreshToken: string) {
    try {
      const verifyToken = await this.jwtService.verifyToken(refreshToken);
      const findUser = await this.userService.findById(
        verifyToken.candidate._id,
      );
      if (!findUser) throw new UnauthorizedException();

      const refreshTokens = await this.jwtService.refreshTokens(refreshToken, {
        candidate: findUser,
      });

      return {
        login: findUser.login,
        ...refreshTokens,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
