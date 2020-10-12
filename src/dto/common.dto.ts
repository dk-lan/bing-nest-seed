import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Lang } from '@/bing';

export class IndexIDDTO extends Lang{
    @ApiModelProperty({description: "id"})
    indexid: number;
}

export class PasswordDTO extends Lang{
    @IsNotEmpty()
    @Length(6, 20)
    @ApiModelProperty({description: "密码", required: true, minLength: 6, maxLength: 20})
    password: string;
}