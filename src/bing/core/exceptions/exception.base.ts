import { HttpException } from "@nestjs/common";

/**
 * 异常基类
 */
export abstract class ExceptionBase extends HttpException {
    /**
     * 异常信息
     */
    error: Error;

    /**
     * 初始化异常基类
     * @param response 响应内容
     * @param status 状态码
     * @param error 异常信息
     */
    constructor(response: string | object, status: number, error?: Error) {
        super(response, status);
        this.error = error;
    }
}