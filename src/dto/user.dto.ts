import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Lang, QueryParameter } from '@/bing';

/**
 * 注册实体
 */
export class UserDTO extends Lang{
    @IsNotEmpty()
    @Length(6, 20)
    @ApiProperty({description: "用户名", required: true, minLength: 6, maxLength: 20})
    username: string;

    @IsNotEmpty()
    @Length(6, 20)
    @ApiProperty({description: "密码", required: true, minLength: 6, maxLength: 20})
    password: string;
}