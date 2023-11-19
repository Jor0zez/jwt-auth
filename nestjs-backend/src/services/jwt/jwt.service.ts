import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './schemas/jwt.schema';

@Injectable()
export class JWTService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: object) {
    try {
      const refreshToken = await this.jwtService.sign(payload, {
        expiresIn: '30d',
        secret: process.env.JWT_SECRET,
      });
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: '30m',
        secret: process.env.JWT_SECRET,
      });

      return {
        refreshToken,
        accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async refreshTokens(refreshToken: string, payload: object) {
    try {
      const generateTokens = await this.generateTokens(payload);
      const findAndUpdateToken = await this.tokenModel
        .findOneAndUpdate(
          { token: refreshToken },
          { token: generateTokens.refreshToken },
        )
        .exec();
      if (!findAndUpdateToken) throw new UnauthorizedException();

      return generateTokens;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async findRefreshToken(refreshToken: string) {
    try {
      const findToken = await this.tokenModel
        .findOne({ token: refreshToken })
        .exec();
      if (!findToken) throw new UnauthorizedException();

      return findToken;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async logout(refreshToken: string) {
    try {
      const findToken = await this.tokenModel
        .findOne({ token: refreshToken })
        .exec();
      if (!findToken) throw new UnauthorizedException();

      await findToken.deleteOne();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  verifyToken(refreshToken: string) {
    try {
      const userData = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      return userData;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async saveToken(uid: object, token: string, date: string) {
    try {
      const saveToken = new this.tokenModel({
        uid,
        token,
        date,
      });
      await saveToken.save();

      return saveToken;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
