import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiControllerBase } from '@/bing';
import { BTCService } from '@/service'
import { BTCImportDTO }  from '@/dto'
import { AccountVTO } from '@/vto';

@ApiTags('BTC - 比特币账户账户操作')
@Controller('btc')
export class BTCController extends ApiControllerBase{

    /**
     * init controller
     * @param service 
     */
    constructor(private readonly service: BTCService) {
        super();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '创建账户，返回地址、私钥' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('create/privatekey')
    public async Create(): Promise<any>{
        return await this.service.Create();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '通过导入私钥生成账户' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('import')
    public async Import(@Body() dto: BTCImportDTO): Promise<any>{
        return await this.service.Import(dto);
    }    
}