/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.header(`user-agent`);
    const browserClient = userAgent.split(' ')[0] || 'Unknown';
    request.headers.browser = browserClient.split(` `)[0];
    console.log(
      `Interceptor: manipulated request with new browser header: ${request.headers.browser}`,
    );
    return next.handle();
  }
}
