export class RedisConfig{
    /**
     * 主机
     */
    host: string;

    /**
     * 端口
     */
    port: number | 6379;

    /**
     * 4 (IPv4) or 6 (IPv6)
     */
    family: number;

    /**
     * 密码
     */
    password: string;

    /**
     * db
     */
    db: number | 0;

    constructor(partial: Partial<RedisConfig>){
        Object.assign(this, partial);
    }
}