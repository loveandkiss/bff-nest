import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  // 生成token
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
  // 校验token
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
