import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, ArrayContains, IsIn } from 'class-validator';
import { Lang, QueryParameter } from '@/bing';

/**
 * 注册实体
 */
export class ETHImportDTO extends Lang{
    @IsNotEmpty()
    @IsIn(['privatekey', 'mnemonic', 'keystore'])
    @ApiProperty({description: "导入类型 ['privatekey', 'mnemonic', 'keystore']", required: true})
    type: string;

    @IsNotEmpty()
    @ApiProperty({description: "对应类型的内容", required: true})
    text: string;

    @ApiProperty({description: "类型为 keystore 时需要密码", required: false})
    password: string;
}