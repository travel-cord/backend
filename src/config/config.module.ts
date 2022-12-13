import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { database2Config, databaseConfig } from '@config/database.config'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { HttpModule } from '@nestjs/axios'
import { HealthCheckController } from '../health-check/health-check.controller'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    TypeOrmModule.forRootAsync(database2Config),
    ScheduleModule.forRoot(),
    TerminusModule,
    HttpModule
  ],
  providers: [],
  controllers: [HealthCheckController],
  exports: []
})
export class CustomConfigModule {}
