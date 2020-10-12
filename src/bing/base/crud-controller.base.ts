import { IKey, CrudServiceBase } from '@/bing';
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
}