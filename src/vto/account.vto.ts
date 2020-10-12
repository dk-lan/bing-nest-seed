import { ApiModelProperty } from '@nestjs/swagger';

export class AccountVTO{

    @ApiModelProperty({description: "地址", required: false})
    address: string

    @ApiModelProperty({description: "私钥", required: false})
    privateKey: string

    @ApiModelProperty({description: "助记词", required: false})
    mnemonic: string

    @ApiModelProperty({description: "keystore", required: false})
    keystore: string
}