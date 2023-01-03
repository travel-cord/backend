import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from '@app/common'
import { TerminusModule } from '@nestjs/terminus'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/health/.env.dev'
    }),
    CommonModule,
    TerminusModule,
    HttpModule
  ],
  controllers: [HealthController]
})
export class HealthModule {}
