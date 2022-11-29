import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from '@config/database.config'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { HttpModule } from '@nestjs/axios'
import { HealthCheckController } from '../health-check/health-check.controller'
import { MyLogger } from '@config/logger.config'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    ScheduleModule.forRoot(),
    TerminusModule,
    HttpModule
  ],
  providers: [MyLogger],
  controllers: [HealthCheckController],
  exports: [MyLogger]
})
export class CustomConfigModule {}
