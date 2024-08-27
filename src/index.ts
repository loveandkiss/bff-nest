import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity'; // 导入你的实体类

export const configOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    entities: [User],
    synchronize: true, // 注意：生产环境中建议设为 false
    logging: false,
}
export const AppDataSource = new DataSource(configOptions);