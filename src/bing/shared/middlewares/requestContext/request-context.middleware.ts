import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { RequestContext } from './request-context';

/**
 * 请求上下文 中间件
 */
@Injectable()
export class RequestContextMidlleware implements NestMiddleware {
    /**
     * 解析执行
     */
    resolve() {
        console.log('执行请求上下文中间件...');
        return (req, res, next) => {
            const requestContext = new RequestContext(req, res);
            const session = cls.getNamespace(RequestContext.nsid) || cls.createNamespace(RequestContext.nsid);

            session.run(async () => {
                session.set(RequestContext.name, requestContext);
                next();
            });
        };
    }
}