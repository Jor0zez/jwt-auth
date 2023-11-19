import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../services/user/schemas/register.schema';
import { InjectModel } from '@nestjs/mongoose';
import RegisterDto from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { format } from 'date-fns';
import { JWTService } from 'src/services/jwt/jwt.service';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JWTService,
  ) {}
  async register({ login, password }: RegisterDto) {
    try {
      const existingUser = await this.userService.findOneLogin(login);
      if (existingUser) {
        throw new UnauthorizedException();
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const registerDate = format(Date.now(), 'yyyy-MM-dd');
      const newUser = await this.userService.createUser({
        login,
        password: hashPassword,
        registerDate,
      });
      const tokens = await this.jwtAuthService.generateTokens({
        candidate: newUser,
      });
      await this.jwtAuthService.saveToken(
        newUser._id,
        tokens.refreshToken,
        registerDate,
      );

      return {
        login,
        ...tokens,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
