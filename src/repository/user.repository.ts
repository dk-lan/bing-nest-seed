import { EntityRepository } from 'typeorm';
import { RepositoryBase, PagerList, QueryParameter } from '@/bing';
import { UserEntity } from '@/entity';

@EntityRepository(UserEntity)
export class UserRepository extends RepositoryBase<UserEntity>{

    /**
     * 分页获取用户信息
     * @param query 
     */
    public async Users(query: QueryParameter): Promise<PagerList<UserEntity>> {
        const queryBuilder = this.createQueryBuilder();
        if(query.orderword){
            queryBuilder.orderBy(query.orderword, (query.order || 0) ? 'ASC' : 'DESC');
        }

        return await this.pageHandler<UserEntity>(query, queryBuilder);
    }
}