<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).




## MySQL

MySQL：是一种流行的关系型数据库管理系统，用于存储和管理结构化数据。

TypeORM：是一个 TypeScript 和 JavaScript 的 ORM（对象关系映射）库，允许开发者以面向对象的方式与数据库交互。


## TypeORM


npm install --save @nestjs/typeorm typeorm mysql2

安装数据库驱动:
npm install mysql --save (也可以安装 mysql2)


在 TypeORM 中，Entity Manager 和 Repositories 都是用于与数据库交互的工具，但它们各自有不同的使用场景和功能。了解它们之间的区别有助于选择最适合你的应用程序的方式。

Entity Manager 是一个集中化的管理对象，提供了对所有实体的操作功能。它允许你在不依赖特定的仓库的情况下执行 CRUD 操作。
优点：适用于需要对多个实体进行操作，或者当实体动态决定时。适合用在没有明显实体仓库的场景。
缺点：操作不够专用，可能会导致复杂的代码和维护困难。
```ts
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.entityManager.find(User);
  }

  async createUser(name: string, age: number): Promise<User> {
    const user = new User();
    user.name = name;
    user.age = age;
    return this.entityManager.save(user);
  }
}




```



Repositories 是为特定实体提供的数据访问层，封装了对该实体的 CRUD 操作，并提供了额外的查询功能。每个实体都有一个对应的仓库。
优点：清晰的组织结构和代码分离，适合大多数应用程序中的常规 CRUD 操作。支持自定义查询和业务逻辑。
缺点：可能需要为每个实体创建单独的仓库，增加了一些额外的设置。

```ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(name: string, age: number): Promise<User> {
    const user = new User();
    user.name = name;
    user.age = age;
    return this.userRepository.save(user);
  }
}



```


### 配置文件 ormconfig.json
在 TypeORM 的配置文件中，"entities": ["dist/**/*.entity{.ts,.js}"] 用于指定 TypeORM 应该扫描和加载的实体文件的位置。
这是 TypeORM 配置中的一个属性，用于指定实体类的位置。这些实体类是与数据库表映射的类，TypeORM 会根据这些实体生成和执行 SQL 查询。

"dist/**/*.entity{.ts,.js}"：这是一个文件路径模式，用于匹配实际的实体文件。这个模式包含了两个部分：

dist/：这是你编译后的 JavaScript 文件的根目录。通常，TypeScript 文件在项目的源目录（如 src/）中编写，然后通过 TypeScript 编译器（tsc）编译成 JavaScript 文件，并输出到 dist/ 目录中。

/**/*.entity{.ts,.js}：这是一个通配符模式，具体说明如下：

**/：表示递归地匹配所有子目录。
*.entity：匹配所有以 .entity 结尾的文件名。这是一个常见的命名约定，用于标识 TypeORM 实体文件。
{.ts,.js}：表示匹配以 .ts 或 .js 结尾的文件。由于 TypeScript 文件在开发过程中是 .ts 格式，编译后变为 .js 格式，因此这个模式覆盖了两种情况。


the ormconfig.json file is loaded by the typeorm library.



## Guards【守卫】

在 NestJS 中，Guard 是用于处理请求授权的机制。
Authorization Guard 主要用于验证用户的权限，确保用户有权访问某个特定的路由。Guard 是 NestJS 中用于保护路由的关键机制。



@nestjs/jwt




## Interceptors【拦截器】

在 NestJS 中，Interceptor 是一种用于处理请求和响应的机制。它类似于中间件，但更为灵活和强大。
拦截器可以用来对请求和响应进行各种操作，如日志记录、修改数据、处理错误等。



## Pipes


## dto（Data Transfer Object） 和 entity（实体） 的区别

Entity（实体）：实体通常指的是与数据库表相对应的数据模型。
它代表了业务逻辑中的一个核心对象，直接映射到数据库中的一行。例如，在一个用户管理系统中，User 实体可能会包含 id、name、email 等字段，这些字段直接对应数据库中的列。实体用于保存和管理业务数据。

DTO（Data Transfer Object）：DTO是一种用于数据传输的对象，通常在不同层或系统之间传递数据时使用。
它不包含业务逻辑，主要用于传输数据以减少网络传输中的负担和提高效率。例如，在一个Web应用中，DTO可能会用来传递用户的注册信息，包含 username 和 password，但不包括数据库中的 id 和其他内部字段。


## 在 TypeORM 中，通过 Repository 来更新实体的方法有几种，你可以根据具体需求选择适合的方式。


1. 使用 update 方法

2. 使用 save 方法



## @nestjs/jwt 插件
A progressive Node.js framework for building efficient and scalable server-side applications.
JWT utilities module for Nest based on the jsonwebtoken package.


- installation

```bash
npm i --save @nestjs/jwt

```

- Usage


在 AuthModule 导入
Import JwtModule:

```ts

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  providers: [...],
})
export class AuthModule {}


```

在 AuthService 注入
Inject JwtService:

```ts

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
}


```

https://www.npmjs.com/package/@nestjs/jwt


## dotenv 插件
dotenv 插件用于在 Node.js 应用中加载环境变量。它从 .env 文件中读取键值对，并将这些变量添加到 process.env 中，使得你可以在应用中安全地使用这些变量来配置应用，比如数据库连接字符串、API 密钥等。这样可以避免将敏感信息硬编码在源代码中。


















