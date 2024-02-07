import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IUser, SignInUserDTO, SignUpUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { Public } from 'src/constants/constants.index';
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Public()
  @Post('signup')
  async signUpUser(@Body() userData: SignUpUserDTO) {
    try {
      const { user, token }: { user: IUser; token: string } =
        await this.service.createUser(userData);
      return { user, token };
    } catch (err) {
      return err.message;
    }
  }
  @Public()
  @Post('signin')
  async signInUser(@Body() userData: SignInUserDTO) {
    try {
      const { user, token }: { user: null | IUser; token: string } =
        await this.service.getUserByEmail(userData);
      return { user, token };
    } catch (err) {
      return err.message;
    }
  }
  @Public()
  @Get()
  async getAllUsers() {
    try {
      const users: IUser[] = await this.service.getAllUsers();
      return users;
    } catch (err) {
      return err.message;
    }
  }
  @Get(':userId')
  async getUserById(@Param('userId') userId: number) {
    try {
      const user: IUser | null = await this.service.getUserById(userId);
      return user;
    } catch (err) {
      return err.message;
    }
  }
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() newUserData: UpdateUserDTO,
  ) {
    try {
      const user: IUser | null = await this.service.updateUser(
        userId,
        newUserData,
      );
      return user;
    } catch (err) {
      return err.message;
    }
  }
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    try {
      const userDeleted: boolean = await this.service.deleteUser(userId);
      return userDeleted;
    } catch (err) {
      return err.message;
    }
  }
}
