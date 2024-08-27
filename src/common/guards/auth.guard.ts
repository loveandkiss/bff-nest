import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
// JwtService 用于解码和验证 JWT 令牌。
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 守卫
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('No token found');
        }
        try {
            // The verify method is an implementation of jsonwebtoken .verify(). 
            // Differing from jsonwebtoken it also allows an additional secret, privateKey, and publicKey properties on options to override options passed in from the module. 
            const decoded = this.jwtService.verify(token, {
                "secret": process.env.JWT_SECRET, // 使用你自己的密钥
            });
            request.user = decoded; // 将用户信息附加到请求对象上
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
