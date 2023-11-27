import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseeModule } from './database/database.module';
import { RequestLoggingMiddleware } from './middleware/request-logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    DatabaseeModule,
    RoleModule,
  ],
  providers: [RequestLoggingMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
