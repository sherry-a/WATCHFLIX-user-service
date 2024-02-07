import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { CustomValidatorModule } from 'src/customValidators/customValidators.module';
import { JWTModule } from 'src/jwt/jwt.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserRepository],
  imports: [CustomValidatorModule, BcryptModule, JWTModule],
})
export class UserModule {}
