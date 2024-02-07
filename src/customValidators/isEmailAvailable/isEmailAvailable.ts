import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/User/user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    return user === null;
  }
}

export function IsEmailAvailable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAvailableConstraint,
    });
  };
}
