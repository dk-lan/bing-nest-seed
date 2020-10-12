import { ServiceBase } from './service.base';
import { IKey } from '../core/model';
import { Injectable } from '@nestjs/common';
import { RepositoryBase } from './respository.base';

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
}