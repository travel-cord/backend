import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from '@auth/auth.module'
import { UserModule } from '@user/user.module'
import { LoggerMiddleware } from '@common/middleware/logger.middleware'
import { DatabaseModule } from '@common/config/database.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
    }),
    AuthModule,
    UserModule,
    DatabaseModule
  ],
  providers: [Logger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
