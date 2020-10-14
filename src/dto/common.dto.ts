import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Lang } from '@/bing';

export class IndexIDDTO extends Lang{
    @ApiProperty({description: "id"})
    indexid: number;
}

export class PasswordDTO extends Lang{
    @IsNotEmpty()
    @Length(6, 20)
    @ApiProperty({description: "密码", required: true, minLength: 6, maxLength: 20})
    password: string;
}