import { ServiceBase } from './service.base';
import { IKey } from '../core/model';
import { Injectable } from '@nestjs/common';
import { RepositoryBase } from './respository.base';
import { Warning } from '@/bing/core/warning';

/**
 * 增删改查服务基类
 */
@Injectable()
export class CrudServiceBase<T extends IKey> extends ServiceBase {

    /**
     * 初始化增删改查服务基类
     * @param repository 仓储
     */
    constructor(protected readonly repository: RepositoryBase<T>) {
        super();
    }

    /**
     * 创建
     * @param entity 实体
     */
    public async add(entity: T): Promise<T> {
        return await this.repository.add(entity);
    }

    /**
     * 编辑
     * @param entity 实体
     */
    public async edit(entity: T): Promise<T> {
        return await this.repository.edit(entity);
    }

    /**
     * 删除
     * @param id 标识
     */
    public async delete(id: any): Promise<void> {
        try {
            await this.repository.removeById(id);
        } catch (err) {
            throw new Warning('删除失败');
        }
    }

    /**
     * 通过编号获取实体
     * @param id 标识
     */
    public async getById(id: number): Promise<T> {
        return await this.repository.findOne(id);
    }

    /**
     * 通过标识列表获取
     * @param ids 标识列表
     */
    public async getByIds(ids: any[]): Promise<T[]> {
        return await this.repository.findByIds(ids);
    }


    public async getAll(): Promise<T[]> {
        return await this.repository.find();
    }
}