import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config()
console.log('process.env.JWT_SECRET:::auth', process.env.JWT_SECRET)
@Module({
  imports: [
    // 配置 JWT 模块
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 使用你自己的密钥
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // 导出 JwtModule
})
export class AuthModule { }
