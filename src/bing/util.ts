import * as helper from './common/helper';
import * as encrypt from './common/encrypt';
import http from './common/http'
import { Log } from './common/log';
import moment = require('moment');
import * as random from './common/random';
import match from './common/match'
import { Prefix } from './common/prefix'
import { ServerConfig } from './config/server.config'
import { RabbitMQ } from './core/rabbitmq'

/**
 * 操作库
 */
export class util {
    /**
     * 公共操作
     */
    static helper = helper;

    /**
     * 日志操作
     */
    static log = new Log();

    /**
     * 加密操作
     */
    static encrypt = encrypt;

    /**
     * moment操作
     */
    static moment = moment;

    /**
     * 随机字符串操作
     */
    static ramdom = random;

    /**
     * http 请求操作
     */
    static http = http;

    /**
     * 数学运算操作
     */
    static match = match;

    /**
     * 地址前缀操作
     */
    static prefix = Prefix;

    /**
     * 当前时间
     */
    static now = () => {return moment().toDate()} ;

    /**
     * 暂停几秒
     */
    static sleep = (time: number) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, (time || 1) * 1000)
    })

    /**
     * 初始化服务器配置
     */
    static serverconfig = new ServerConfig();

    /**
     * 初始化 mq
     */
    static rabbitmq = new RabbitMQ();
}