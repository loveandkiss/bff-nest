import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// 更新DTO
// PartialType：这个工具会自动将CreateUserDto中的所有属性变为可选，创建一个新的DTO UpdateUserDto。换句话说，UpdateUserDto中的每个字段都是从CreateUserDto继承而来的，但这些字段都是可选的。
export class UpdateUserDto extends PartialType(CreateUserDto) { }
