import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
