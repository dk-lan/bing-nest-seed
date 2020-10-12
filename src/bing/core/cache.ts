import { util, Warning } from '@/bing';
const Redis = require("ioredis");
const Redlock = require('redlock');
const client = new Redis(util.serverconfig.redis);

export class cache{
    private static redlock = null; 

    static redis = client;

    /**
     * 初始化红锁
     */
    private static initRedLock(){
        this.redlock = new Redlock([client], {
            // the expected clock drift; for more details
            // time in ms
            driftFactor: 0.01, 

            // the time in ms between attempts
            // time in ms
            retryDelay: 200, 

            // the max number of times Redlock will attempt
            // to lock a resource before erroring
            // retryCount * retryDelay 默认尝试 150 次，每次间隔 200 ms，也就是 30 秒还没解锁则会抛异常
            retryCount: 150,

            // the max time in ms randomly added to retries
            // to improve performance under high contention
            // time in ms
            retryJitter:  200 
        });
    }

    /**
     * 默认锁 10 分钟
     * @param key 
     * @param time time in ms
     */
    static async lock(key: string, handlertype?: string, time?: number): Promise<any>{
        try{
            if(!this.redlock){
                this.initRedLock();
            }
            let ttl = time ? time * 1000 : 60 * 1000 * 10;
            console.log(ttl)
            return await this.redlock.lock(key, ttl);
        } catch(err){
            throw `redlock_error => ${handlertype} => ${err.toString()}`
        }
    }
}
