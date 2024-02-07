import { IsEmailAvailable } from 'src/customValidators/isEmailAvailable/isEmailAvailable';
import {
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
export interface IUserSignIn {
  email: string;
  password: string;
}
export interface IUserSignUp extends IUserSignIn {
  name: string;
}
export interface IUserUpdate {
  password?: string;
  name?: string;
}
export interface IUser {
  email: string;
  name: string;
  id: number;
  password?: string;
}
export const selectedFields = {
  id: true,
  email: true,
  name: true,
  password: false,
};
export class SignUpUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsEmailAvailable({ message: 'Email is already in use' })
  email: string;

  @MinLength(6)
  password: string;
}
export class SignInUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain atleast one Uppercase, Lowercase, Number, Symbol each',
    },
  )
  password?: string;
}
