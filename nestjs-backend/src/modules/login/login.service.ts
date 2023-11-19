import { Injectable, UnauthorizedException } from '@nestjs/common';
import loginDto from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/services/user/schemas/register.schema';
import { Model } from 'mongoose';
import { JWTService } from 'src/services/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { format } from 'date-fns';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}

  async login(loginData: loginDto) {
    const { login, password } = loginData;
    const candidate = await this.userService.findOneLogin(login);
    if (!candidate) throw new UnauthorizedException();

    const verifyCandidate = await bcrypt.compare(password, candidate.password);
    if (!verifyCandidate) throw new UnauthorizedException();

    const date = format(new Date(), 'yyyy-MM-dd');
    const tokens = await this.jwtService.generateTokens({ candidate });
    await this.jwtService.saveToken(candidate._id, tokens.refreshToken, date);

    return {
      login,
      ...tokens,
    };
  }
}
