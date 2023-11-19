import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTService } from './jwt.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Token, TokenSchema } from './schemas/jwt.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [JWTService, JwtService],
})
export class JWTModule {}
