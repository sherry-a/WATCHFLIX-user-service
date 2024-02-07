import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptService {
  private saltLength: number;
  constructor() {
    this.saltLength = 10;
  }
  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltLength);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      hashedPassword,
    );
    return isPasswordValid;
  }
}
