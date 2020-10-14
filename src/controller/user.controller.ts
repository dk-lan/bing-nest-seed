import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiControllerBase, QueryParameter } from '@/bing';
import { UserService } from '@/service'
import { UserDTO }  from '@/dto'
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User - 账户操作')
@Controller('user')
export class UserController extends ApiControllerBase{

    /**
     * init controller
     * @param service 
     */
    constructor(private readonly service: UserService) {
        super();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '登录' })
    @Post('login')
    public async Login(@Body() dto: UserDTO): Promise<any>{
        return await this.service.Login(dto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '注册' })
    @Post('register')
    public async Register(@Body() dto: UserDTO): Promise<any>{
        return await this.service.Register(dto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '分页获取所有用户信息' })
    @Get('users')
    @UseGuards(AuthGuard('jwt'))
    public async Users(@Body() dto: QueryParameter): Promise<any>{
        return await this.service.Users(dto);
    }
}