import { QueryParameter } from '../core/model';
import { util, IKey } from '../index';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PagerList } from '../core/pager-list';

/**
 * 仓储基类
 */
export abstract class RepositoryBase<T extends IKey> extends Repository<T> {
    /**
     * 操作库
     */
    protected util = util;

    /**
     * 分页处理器
     * @param query 查询参数
     * @param selectQueryBuilder 查询构建器
     */
    protected async pageHandler<TEntity>(query: QueryParameter, selectQueryBuilder: SelectQueryBuilder<TEntity>): Promise<PagerList<TEntity>> {
        const result = await selectQueryBuilder.skip(query.pageLimit * (query.page - 1)).take(query.pageLimit).getManyAndCount();
        const pageList = new PagerList<TEntity>();
        pageList.initData(result[0], query, result[1]);
        return pageList;
    }

    /**
     * 转换为实体
     * @param entity 实体
     */
    protected toEntity(entity: T): T {
        return entity;
    }

    /**
     * 实例是否在指定类型中
     * @param name 属性名
     * @param object 对象
     */
    protected instanceOfType<T>(name: string, object: any): object is T {
        return name in object;
    }
}