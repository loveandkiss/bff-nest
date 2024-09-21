import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';


// 生成密钥工具
// import './generate-key'


async function bootstrap() {
  console.log('process.env', process.env)
  console.log('测试触发Jenkins从仓库拉取源码')
  console.log('测试触发Jenkins从仓库拉取源码2')
  try {
    // 初始化数据源连接
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }

  // 创建 NestJS 应用实例
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  // 使用全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  // 启动应用
  await app.listen(8090);

}
bootstrap();
