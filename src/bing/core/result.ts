import { Exclude } from 'class-transformer';
import { util, i18n } from '@/bing';
import { Warning } from './warning';

/**
 * 服务端返回的标准结果
 */
export class Result<T>{
    /**
     * 语言类型
     */
    langType: string;

    /**
     * 字典 key
     */
    // @Exclude()
    dicKey: string;

    /**
     * 状态码
     */
    code: number | StateCode = StateCode.Ok;

    /**
     * 消息
     */
    message: string;

    /**
     * 数据
     */
    data: T;

    /**
     * 操作时间
     */
    operationTime: string = util.moment().utc().format('YYYY-MM-DD hh:mm:ss.SSS');

    constructor(partial: Partial<Result<any>>){
        Object.assign(this, partial);

        if(this.dicKey && !this.message){
            this.message = i18n.getDic(this.dicKey, this.langType);
        }
        
        /**
         * 分步式锁后统一提示
         */
        if(this.message.indexOf('redlock_error') > -1){
            this.message = 'NET WORK ERROR: [RLE0001]';
        }
        if(this.code == -1){
            throw new Warning(this.message);
        }
    }
}

/**
 * 状态码
 */
export enum StateCode {
    /**
     * 成功
     */
    Ok = 1,

    /**
     * 失败
     */
    Fail = 0,

    /**
     * 异常
     */
    Error = -1,    
}