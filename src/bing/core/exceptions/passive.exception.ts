import { ExceptionBase } from "./exception.base";

/**
 * 被动异常
 */
export abstract class PassiveException extends ExceptionBase {

    /**
     * 初始化被动异常
     * @param response 响应内容
     * @param status 状态码
     * @param error 异常信息
     */
    constructor(response: string | object, status: number, error?: Error) {
        super(response, status, error);
    }
}