import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 实体 => 与数据库表相对应的数据模型
// Creating an auto-generated column
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    image: string;


    @Column()
    email: string;


}

// const user = new User()
// await user
// User.find