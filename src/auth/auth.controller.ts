import { Controller, Post, Body, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 登录
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    // 验证用户的逻辑（省略）
    const payload = { username: loginDto.username };
    const token = await this.authService.generateToken(payload);
    return { accessToken: token };
  }

  @Get('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    console.log('req.headers', req.headers)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // req.headers.authorization 格式问题：authorization 头部通常是 "Bearer <token>" 格式。
    // 确认 authHeader.split(' ')[1] 的操作能正确提取 token。
    const token = authHeader.split(' ')[1];
    try {
      // 解码
      const decoded = await this.authService.verifyToken(token);
      // console.log('decoded', decoded) // { username: '叶挺2', iat: 1724724265, exp: 1724727865 }
      // iat: issued at 时间戳，表示 token 被签发的时间，通常是一个 UNIX 时间戳（即自 1970 年 1 月 1 日以来的秒数）。
      // exp: expiration 时间戳，表示 token 的过期时间，也是一个 UNIX 时间戳。

      const username = decoded.username; // 从解码的 token 中提取用户名


      // 处理用户数据
      res.json({ user: decoded });
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
