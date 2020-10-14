import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Result } from '@/bing';
import { map } from 'rxjs/operators';

/**
 * 结果包装 拦截器
 */
@Injectable()
export class ResultWrapperInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
        .handle()
        .pipe(map(value => {
            return value as Result<any>;
        }))
    }
}