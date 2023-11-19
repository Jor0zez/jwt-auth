import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './modules/register/register.module';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './modules/login/login.controller';
import { LoginModule } from './modules/login/login.module';
import { RefreshController } from './modules/refresh/refresh.controller';
import { RefreshModule } from './modules/refresh/refresh.module';
import { LogoutModule } from './modules/logout/logout.module';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/FL'),
    ConfigModule.forRoot(),
    RefreshModule,
    RegisterModule,
    LoginModule,
    RefreshModule,
    LogoutModule,
    UserModule,
  ],
})
export class AppModule {}
