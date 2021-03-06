import { NestMiddleware, Injectable } from '@nestjs/common';

/**
 * Cors中间件
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {

    use(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, authorization, Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        if(req.method == "OPTIONS") {
            res.send(200);/*让options请求快速返回*/
        } else{
            next();
        }
    }
}