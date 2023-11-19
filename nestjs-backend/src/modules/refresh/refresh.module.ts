import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshController } from './refresh.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from '../../services/jwt/jwt.service';
import { Token, TokenSchema } from '../../services/jwt/schemas/jwt.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../services/user/schemas/register.schema';
import { RefreshMiddleware } from './refresh.middleware';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [RefreshController],
  providers: [RefreshService, JWTService, UserService],
})
export class RefreshModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshMiddleware).forRoutes('register');
  }
}
