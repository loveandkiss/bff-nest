import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// typeorm
import { TypeOrmModule } from '@nestjs/typeorm'
// 在 TypeORM 0.3.x 版本及更高版本中，getConnectionOptions 被移除了，因为新的连接管理机制已被引入。
// 在 TypeORM 0.3.x 及更高版本中，推荐使用 DataSource 类来替代 getConnectionOptions。DataSource 类是新的连接管理方式，允许你定义和管理数据库连接配置。
// import { getConnectionOptions } from 'typeorm'
import { User } from './users/entities/user.entity'
import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
import { configOptions } from './index'


@Module({
  // 导入
  imports: [
    TypeOrmModule.forRoot(configOptions),
    // TypeOrmModule.forFeature([User]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
