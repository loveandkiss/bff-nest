
import { IsString, IsInt, Max, Min, IsNotEmpty, IsEmail } from 'class-validator'

// 创建DTO
// Data Transfer Object => DTO是一种用于数据传输的对象，通常在不同层或系统之间传递数据时使用。
export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ "message": "Name is required" })
    name: string;

    @Min(2)
    @Max(20)
    @IsInt()
    age: number;

    @IsString()
    image: string;

    @IsString()
    @IsEmail({}, { "message": "Invalid email format" })
    @IsNotEmpty({ "message": "Email is required" })
    email: string;
}
