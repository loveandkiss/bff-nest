import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// 使用 DataSource 在服务中进行操作
import { AppDataSource } from '../index'
// 实体
import { User } from '../users/entities/user.entity'
// 三个装饰器，用于在 NestJS 中进行依赖注入。它们分别用于注入 TypeORM 的 Entity Manager、Data Source 和 Repository。
import { InjectEntityManager, InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository, DataSource } from 'typeorm'

// AppDataSource.getRepository

@Injectable()
export class UsersService {
  constructor(
    // 用于将 TypeORM 的 EntityManager 注入到你的服务或组件中。EntityManager 提供了对所有实体的操作功能，可以执行 CRUD 操作和复杂查询。
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    // 用于将 TypeORM 的 DataSource 注入到你的服务或组件中。DataSource 是 TypeORM 用于管理数据库连接的核心对象，提供了访问数据库和执行查询的方法。

    @InjectDataSource()
    private readonly dataSource: DataSource,
    // 用于将特定实体的 TypeORM Repository 注入到你的服务或组件中。Repository 提供了对特定实体的 CRUD 操作和自定义查询功能。
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {

  }

  // Creating and inserting a user into the database.
  // We just created a new photo and saved it in the database. We used EntityManager to save it.
  async create(createUserDto: CreateUserDto) {
    const user = new User()
    user.name = createUserDto.name
    user.age = createUserDto.age
    user.image = createUserDto.image
    user.email = createUserDto.email
    // await AppDataSource.manager.save(user)
    // 等同于
    await this.entityManager.save(user)
    return 'This action adds a new user';
  }

  // 查找所有
  async findAll() {
    // const savedPhotos = await AppDataSource.manager.find(User)
    // 等同于
    // const savedPhotos = await this.entityManager.find(User)
    const userRepository = this.dataSource.getRepository(User);
    const savedPhotos = await userRepository.find()
    return savedPhotos;
  }

  // 查找某一项
  findOne(id: number) {
    const userRepository = this.dataSource.getRepository(User);
    return userRepository.findOne({ "where": { "id": id } })
  }

  // 更新
  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const userRepository = this.dataSource.getRepository(User);
  //   // 保存更新后的实体
  //   await userRepository.update(id, updateUserDto)
  //   console.log('更新成功...')
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 先查找实体
    const user = await this.findOne(id);
    if (!user) return null;
    // 更新实体字段
    Object.assign(user, updateUserDto);
    const userRepository = this.dataSource.getRepository(User);
    // 保存更新后的实体
    return userRepository.save(user)
  }

  // 删除
  async remove(id: number) {
    // const userRepository = AppDataSource.getRepository(User)
    // const photoToRemove = await userRepository.findOneBy({
    //   id
    // })
    // await userRepository.remove(photoToRemove)
    const userRepository = this.dataSource.getRepository(User);
    // 先查找实体
    const user = await this.findOne(id);
    if (!user) return null;
    return userRepository.remove(user)
  }
}
