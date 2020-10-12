import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { util } from '@/bing';

/**
 * 日志 中间件
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    /**
     * 工具库
     */
    protected util = util;

    /**
     * 解析执行
     * @param args 参数
     */
    async resolve(...args: any[]): Promise<MiddlewareFunction> {
        return async (request: Request, response: Response, next: NextFunction) => {
            this.util.log.debug({
                title: '执行日志中间件',
                request: {
                    headers: request.headers,
                    method: request.method,
                    url: request.url,
                    originalUrl: request.originalUrl,
                    params: request.params,
                    query: request.query,
                    body: request.body,
                    route: request.route,
                    ip: request.ip
                }
            });
            next();
        };
    }
}