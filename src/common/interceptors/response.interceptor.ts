import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// RxJS 6.x 及之前版本: 使用 import { map } from 'rxjs/operators'。
// RxJS 7.x 及之后版本: 使用 import { map } from 'rxjs'。
// import { map } from 'rxjs/operators'
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map(data => {
                // 统一格式
                return {
                    statusCode: 200,
                    message: 'Success',
                    data: data
                };
            }),
        );
    }
}
