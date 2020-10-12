import { NestInterceptor, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Result } from '@/bing';
import { map } from 'rxjs/operators';

/**
 * 结果包装 拦截器
 */
@Injectable()
export class ResultWrapperInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        return call$.pipe(map(value => {
            return value as Result<any>;
        }));
    }
}