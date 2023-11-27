import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const date = new Date();
    const formattedDate = `${date.toISOString().slice(0, 19)}Z`;

    console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);

    next();
  }
}
