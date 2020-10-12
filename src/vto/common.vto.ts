import { ApiModelProperty } from '@nestjs/swagger';
import { StateCode } from '@/bing'

export class CommonVTO<T>{

    @ApiModelProperty({description: "语言类型"})
    langType: string;

    @ApiModelProperty({description: "字典 key"})
    dicKey: string;

    @ApiModelProperty({description: "状态码 ", enum: StateCode})
    code: number;

    @ApiModelProperty({description: "字典 key 对应语言类型的提示"})
    message: string;

    @ApiModelProperty({description: "数据"})
    data: T;

    @ApiModelProperty({description: "操作时间"})
    operationTime: string;
}