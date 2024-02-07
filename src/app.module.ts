import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { JWTModule } from './jwt/jwt.module';
@Module({
  imports: [UserModule, JWTModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
