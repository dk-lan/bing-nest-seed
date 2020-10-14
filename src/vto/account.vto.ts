import { ApiProperty } from '@nestjs/swagger';

export class AccountVTO{

    @ApiProperty({description: "地址", required: false})
    address: string

    @ApiProperty({description: "私钥", required: false})
    privateKey: string

    @ApiProperty({description: "助记词", required: false})
    mnemonic: string

    @ApiProperty({description: "keystore", required: false})
    keystore: string
}