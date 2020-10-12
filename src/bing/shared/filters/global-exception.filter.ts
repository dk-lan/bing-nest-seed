import { util } from '@/bing';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

/**
 * 全局异常过滤器
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    /**
     * 操作库
     */
    protected util = util;

    /**
     * 抛出异常
     * @param exception Http异常
     * @param host 主机参数
     */
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        this.util.log.error({
            title: 'Application Error', request: {
                headers: request.headers,
                method: request.method,
                url: request.url,
                originalUrl: request.originalUrl,
                params: request.params,
                query: request.query,
                body: request.body,
                route: request.route,
                ip: request.ip
            },
        }, exception);

        response
            .status(200)
            .json({
                code: -1,
                result: false,
                message: exception && exception.toString().indexOf('redlock_error') > -1 ? 'NET WORK ERROR: [RLE0001]' : exception,
                data: null,
                operationTime: util.moment().utc().format('YYYY-MM-DD hh:mm:ss.SSS'),
            });
    }
}