import { ApiProperty } from '@nestjs/swagger';
import { StateCode } from '@/bing'

export class CommonVTO<T>{

    @ApiProperty({description: "语言类型"})
    langType: string;

    @ApiProperty({description: "字典 key"})
    dicKey: string;

    @ApiProperty({description: "状态码 ", enum: StateCode})
    code: number;

    @ApiProperty({description: "字典 key 对应语言类型的提示"})
    message: string;

    @ApiProperty({description: "数据"})
    data: T;

    @ApiProperty({description: "操作时间"})
    operationTime: string;
}