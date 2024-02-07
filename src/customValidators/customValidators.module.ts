import { Module } from '@nestjs/common';
import { IsEmailAvailableConstraint } from './isEmailAvailable/isEmailAvailable';
import { UserRepository } from 'src/modules/User/user.repository';
import { PrismaService } from 'src/prisma.service';
@Module({
  providers: [IsEmailAvailableConstraint, UserRepository, PrismaService],
  exports: [IsEmailAvailableConstraint],
})
export class CustomValidatorModule {}
