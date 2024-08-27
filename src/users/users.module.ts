import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([User, UserRepository]), // 确保 UserRepository 已注册
  // ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule { }
