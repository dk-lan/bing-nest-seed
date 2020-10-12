import { EntitySchema } from 'typeorm';

export class MysqlConfig {
    /**
     * 数据库主机
     */
    host: string;

    /**
     * 端口
     */
    port: number | 3306;

    /**
     * 数据库用户密码
     */
    username: string;

    /**
     * 数据库密码
     */
    password: string;

    /**
     * 数据库名称
     */
    database: string;
    
    synchronize: boolean;

    /**
     * 数据库对应实体
     */
    entities: ((Function | string | EntitySchema<any>))[];

    constructor(partial: Partial<MysqlConfig>){
        Object.assign(this, partial);
    }
}