import { Injectable } from '@nestjs/common';
import { IUser } from 'src/modules/User/user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJWT(userData: IUser) {
    const jwt = await this.jwtService.signAsync(userData);
    return jwt;
  }
  async verifyJWT(JWT: string) {
    const jwt = await this.jwtService.verifyAsync(JWT);
    return jwt;
  }
}
