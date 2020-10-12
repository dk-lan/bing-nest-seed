import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, ArrayContains, IsIn } from 'class-validator';
import { Lang, QueryParameter } from '@/bing';

/**
 * 注册实体
 */
export class BTCImportDTO extends Lang{
    @IsNotEmpty()
    @ApiModelProperty({description: "私钥", required: true})
    privateKey: string;
}