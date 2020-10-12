import { ExceptionBase } from './exception.base';

/**
 * 记录异常
 */
export abstract class LoggedException extends ExceptionBase {
    /**
     * 初始化记录异常
     * @param response 响应内容
     * @param status 状态码
     * @param error 异常信息
     */
    constructor(response: string | object, status: number, error?: Error) {
        super(response, status, error);
    }
}