import { IKey, CrudServiceBase, Warning } from '@/bing';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { ApiControllerBase } from './api-controller.base';

/**
 * 增删改查控制器基类
 */
export class CrudControllerBase<T extends IKey> extends ApiControllerBase {
    /**
     * 初始化增删改查控制器基类
     * @param crudService 增删改查服务
     */
    constructor(private readonly crudService: CrudServiceBase<T>) {
        super();
    }

    /**
     * 创建
     * @param entity 实体
     */
    @ApiOperation({ title: '创建' })
    @Post()
    public async add(@Body() entity: T): Promise<T> {
        if (entity === null) {
            throw new Warning('创建参数不能为空');
        }
        return this.crudService.add(entity);
    }

    /**
     * 更新
     * @param id 实体编号
     * @param entity 实体
     */
    @ApiOperation({ title: '更新' })
    @Put(':id')
    public async edit(@Param('id') id: number, @Body() entity: T): Promise<T> {
        if (entity === null) {
            throw new Warning('修改参数不能为空');
        }
        if (this.util.helper.isEmpty(id) && this.util.helper.isEmpty(entity.indexid)) {
            throw new Warning('Id不能为空');
        }
        if (this.util.helper.isEmpty(entity.indexid)) {
            entity.indexid = id;
        }
        await this.crudService.edit(entity);
        return this.crudService.getById(entity.indexid);
    }

    /**
     * 删除
     * @param id 实体编号
     */
    @ApiOperation({ title: '删除' })
    @Delete(':id')
    public async delete(@Param('id') id: string) {
        return this.crudService.delete(id);
    }

    /**
     * 通过编号获取
     * @param id 实体编号
     */
    @ApiOperation({ title: '通过编号获取' })
    @Get(':id')
    public async getById(@Param('id') indexid: number): Promise<T> {
        return this.crudService.getById(indexid);
    }

    /**
     * 获取全部
     */
    @ApiOperation({ title: '获取全部' })
    @Get()
    public async getAll(): Promise<T[]> {
        return this.crudService.getAll();
    }
}