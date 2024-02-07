import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, IUserSignIn, IUserSignUp, IUserUpdate } from './user.dto';
import { JWTService } from 'src/jwt/jwt.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly authService: JWTService,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(
    userData: IUserSignUp,
  ): Promise<{ user: IUser; token: string }> {
    const hashedPassword: string = await this.bcryptService.hashPassword(
      userData.password,
    );
    userData.password = hashedPassword;
    const user: IUser = await this.repository.createUser(userData);
    const token = await this.authService.generateJWT(user);
    return { user, token };
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.repository.getAllUsers();
  }

  async getUserByEmail(
    userData: IUserSignIn,
  ): Promise<{ user: IUser | null; token: string }> {
    const user: IUser | null = await this.repository.findUserByEmail(
      userData.email,
    );
    if (!user || !user.password) {
      return { user, token: '' };
    }
    const isPasswordValid = await this.bcryptService.isPasswordValid(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const token = await this.authService.generateJWT(user);
    return { user, token };
  }

  async getUserById(userId: number): Promise<IUser | null> {
    const existingUser: IUser | null = await this.repository.findUserById(
      userId,
    );
    if (!existingUser) {
      return null;
    }
    return existingUser;
  }

  async updateUser(userId: number, newUserData: IUserUpdate): Promise<IUser> {
    if (newUserData.password) {
      const hashedPassword = await this.bcryptService.hashPassword(
        newUserData.password,
      );
      newUserData.password = hashedPassword;
    }
    const updatedUser: IUser = await this.repository.updateUser(
      userId,
      newUserData,
    );
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const deletedUser: IUser = await this.repository.deleteUser(userId);
    if (!deletedUser) return false;
    return true;
  }
}
