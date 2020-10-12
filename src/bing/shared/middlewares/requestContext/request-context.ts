import { HttpException, HttpStatus } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { IncomingMessage } from 'http';

/**
 * 请求上下文
 */
export class RequestContext {
    /**
     * Session 标识
     */
    public static nsid = 'some_random_guid';
    /**
     * 标识
     */
    public readonly id: Number;
    /**
     * 请求
     */
    public request: IncomingMessage;
    /**
     * 响应消息
     */
    public response: Response;

    /**
     * 初始化请求上下文
     * @param request 请求
     * @param response 响应消息
     */
    constructor(request: IncomingMessage, response: Response) {
        this.id = Math.random();
        this.request = request;
        this.response = response;
    }

    /**
     * 当前请求上下文
     */
    public static currentRequestContext(): RequestContext {
        const session = cls.getNamespace(RequestContext.nsid);
        if (session && session.active) {
            return session.get(RequestContext.name);
        }
        return null;
    }

    /**
     * 当前请求
     */
    public static currentRequest(): IncomingMessage {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            return requestContext.request;
        }
        return null;
    }

    /**
     * 当前用户
     * @param throwError 是否抛异常
     */
    public static currentUser(throwError?: boolean) {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            // tslint:disable-next-line:no-string-literal
            const user: any = requestContext.request['user'];
            if (user) {
                return user;
            }
        }
        if (throwError) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
}