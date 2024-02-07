import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { IUser, IUserSignUp, IUserUpdate, selectedFields } from './user.dto';
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: IUserSignUp): Promise<IUser> {
    const newUser: IUser = await this.prisma.user.create({
      data: userData,
      select: selectedFields,
    });
    return newUser;
  }
  async getAllUsers(): Promise<IUser[]> {
    const allUsers: IUser[] = await this.prisma.user.findMany({
      select: selectedFields,
    });
    return allUsers;
  }

  async findUserById(userId: number): Promise<IUser | null> {
    const existingUser: IUser | null = await this.prisma.user.findUnique({
      where: { id: userId },
      select: selectedFields,
    });
    return existingUser;
  }

  async findUserByEmail(userEmail: string): Promise<IUser | null> {
    const existingUser: IUser | null = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    return existingUser;
  }

  async updateUser(userId: number, newUserData: IUserUpdate): Promise<IUser> {
    const updatedUser: IUser = await this.prisma.user.update({
      where: { id: userId },
      data: newUserData,
      select: selectedFields,
    });
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<IUser> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
}
