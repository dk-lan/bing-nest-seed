import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, ArrayContains, IsIn } from 'class-validator';
import { Lang, QueryParameter } from '@/bing';

/**
 * 注册实体
 */
export class BTCImportDTO extends Lang{
    @IsNotEmpty()
    @ApiProperty({description: "私钥", required: true})
    privatekey: string;
}