import { MysqlConfig } from './mysql.config';
import { RedisConfig } from './redis.config'
import { RabbitMQConfig } from './rabbitmq.config'
import * as fs from 'fs'

export class ServerConfig{
    /**
     * api 端口
     */
    port: number;

    /**
     * eth http url
     */
    eth_http: string;

    /**
     * eth socket url
     */
    eth_socket: string;

    /**
     * 支持的国际化语言
     */
    languages: Array<string>;

    /**
     * 默认的国际化语言，必须为 languages 选项
     */
    default_language: string;

    /**
     * mysql 配置
     */
    mysql: MysqlConfig;

    /**
     * redis 配置
     */
    redis: RedisConfig;

    /**
     * rabbitmq 配置
     */
    rabbitmq: RabbitMQConfig;

    constructor(partial: Partial<ServerConfig> = null){
        if(partial){
            Object.assign(this, partial);
        } else {
            let ini_str = fs.readFileSync('serverconfig.json');
            const config = JSON.parse(ini_str.toString());
            Object.assign(this, config);
        }
    }
}