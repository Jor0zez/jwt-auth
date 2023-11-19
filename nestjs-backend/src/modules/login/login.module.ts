import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User, UserSchema } from 'src/services/user/schemas/register.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from 'src/services/jwt/jwt.service';
import { Token, TokenSchema } from '../../services/jwt/schemas/jwt.schema';
import { LoginMiddleware } from './login.middleware';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService, JWTService, UserService],
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('register');
  }
}
