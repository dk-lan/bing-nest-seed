import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ApiControllerBase, QueryParameter, HDWallet, Provider } from '@/bing';
import { ETHService } from '@/service'
import { PasswordDTO, ETHImportDTO }  from '@/dto'
import { AccountVTO } from '@/vto';

@ApiUseTags('ETH - 以太坊账户账户操作')
@Controller('eth')
export class ETHController extends ApiControllerBase{

    /**
     * init controller
     * @param service 
     */
    constructor(private readonly service: ETHService) {
        super();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ title: '创建账户，返回地址、私钥' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('create/privatekey')
    public async Create_PrivateKey(): Promise<any>{
        return await this.service.Create_PrivateKey();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ title: '创建账户，返回地址、助记词' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('create/mnemonic')
    public async Create_Mnemonic(): Promise<any>{
        return await this.service.Create_Mnemonic();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ title: '创建账户，返回地址、keystore' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('create/keystore')
    public async Create_Keystore(@Body() dto: PasswordDTO): Promise<any>{
        return await this.service.Create_Keystore(dto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ title: '通过对应类型和内容导入生成账户' })
    @ApiResponse({status: 200, type: AccountVTO})
    @Post('import')
    public async Import(@Body() dto: ETHImportDTO): Promise<any>{
        return await this.service.Import(dto);
    }    
}