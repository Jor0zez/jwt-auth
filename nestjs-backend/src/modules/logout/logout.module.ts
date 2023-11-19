import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from 'src/services/jwt/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/services/jwt/schemas/jwt.schema';
import { LogoutMiddleware } from './logout.middleware';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [LogoutController],
  providers: [LogoutService, JWTService],
})
export class LogoutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogoutMiddleware).forRoutes('register');
  }
}
