import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Token, TokenSchema } from '../../services/jwt/schemas/jwt.schema';
import { RegisterController } from './register.controller';
import { User, UserSchema } from '../../services/user/schemas/register.schema';
import { RegisterService } from './register.service';
import { RegisterMiddleware } from './register.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from 'src/services/jwt/jwt.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, JWTService, UserService],
})
export class RegisterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterMiddleware).forRoutes('register');
  }
}
