import { QueryParameter } from '../core/model';
import { util, IKey, ICreationAudited, AuditedMethod, Warning, IDelete } from '../index';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IModificationAudited, IDeletionAudited } from '../core/auditing';
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
     * 创建
     * @param entity 实体
     */
    public async add(entity: T): Promise<T> {
        return await this.internalSave(this.toEntity(entity), 'add');
    }

    /**
     * 编辑
     * @param entity 实体
     */
    public async edit(entity: T): Promise<T> {
        const oldEntity = await this.findOne(entity.indexid);
        if (this.util.helper.isEmpty(oldEntity)) {
            throw new Warning('对象不存在');
        }
        return await this.internalSave(entity, 'edit');
    }

    /**
     * 通过标识删除对象
     * @param id 标识
     */
    public async removeById(id: string): Promise<T> {
        const entity = await this.findOne(id);
        if (this.util.helper.isEmpty(entity)) {
            throw new Warning('对象不存在');
        }
        return await this.internalSave(entity, 'delete');
    }

    /**
     * 分页处理器
     * @param query 查询参数
     * @param selectQueryBuilder 查询构建器
     */
    protected async pageHandler<TEntity>(query: QueryParameter, selectQueryBuilder: SelectQueryBuilder<TEntity>): Promise<PagerList<TEntity>> {
        const result = await selectQueryBuilder.skip(query.pageLimit * (query.page - 1)).take(query.pageLimit).getManyAndCount();
        const pageList = new PagerList<TEntity>();
        console.log('分页结果',result);
        pageList.initData(result[0], query, result[1]);
        return pageList;
    }

    /**
     * 内部保存
     * @param entity 实体
     * @param method 操作方法
     */
    protected async internalSave(entity: T, method = 'add' || 'edit' || 'delete'): Promise<T> {
        if (!entity || typeof entity !== 'object') {
            throw new Warning('不是有效对象');
        }
        try {
            switch (method) {
                case 'add':
                    return await this.save(this.initAudited(entity, AuditedMethod.Created) as any);
                case 'edit':
                    return await this.save(this.initAudited(entity, AuditedMethod.Updated) as any);
                case 'delete':
                    if (this.instanceOfType<IDelete>('isDeleted', entity)) {
                        if (entity.isDeleted === true) {
                            await this.delete(entity.indexid);
                        } else {
                            entity.isDeleted = true;
                            await this.save(this.initAudited(entity, AuditedMethod.Deleted) as any);
                        }
                    } else {
                        await this.delete(entity.indexid);
                    }
                    return entity;
            }
        } catch (err) {
            throw new Warning(err.message);
        }
    }

    /**
     * 转换为实体
     * @param entity 实体
     */
    protected toEntity(entity: T): T {
        return entity;
    }

    /**
     * 初始化审计
     * @param entity 实体
     * @param method 审计方法
     */
    protected initAudited(entity: T, method: AuditedMethod): T {
        switch (method) {
            case AuditedMethod.Created:
                this.initCreationAudited(entity);
                this.initModificationAudited(entity);
                break;
            case AuditedMethod.Updated:
                this.initModificationAudited(entity);
                break;
            case AuditedMethod.Deleted:
                this.initDeletionAudited(entity);
                break;
        }
        return entity;
    }

    /**
     * 初始化创建操作审计
     * @param entity 实体
     */
    private initCreationAudited(entity: T): T {
        if (this.instanceOfType<ICreationAudited>('creationTime', entity)) {
            entity.creationTime = this.util.moment().utc().toDate();
            entity.creatorId = '测试-创建人';
        }
        return entity;
    }

    /**
     * 初始化修改操作审计
     * @param entity 实体
     */
    private initModificationAudited(entity: T): T {
        if (this.instanceOfType<IModificationAudited>('lastModificationTime', entity)) {
            entity.lastModificationTime = this.util.moment().utc().toDate();
            entity.lastModifierId = '测试-更新人';
        }
        return entity;
    }

    /**
     * 初始化删除操作审计
     * @param entity 实体
     */
    private initDeletionAudited(entity: T): T {
        if (this.instanceOfType<IDeletionAudited>('deletionTime', entity)) {
            entity.deletionTime = this.util.moment().utc().toDate();
            entity.deleterId = '测试-删除人';
        }
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