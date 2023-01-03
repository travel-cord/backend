import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'
import { RedisOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly healthCheckService: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('Auth API', 'http://localhost:3000/auth'),
      () => this.http.pingCheck('User API', 'http://localhost:3000/user'),
      () => this.http.pingCheck('Travel API', 'http://localhost:3000/travel'),
      () => this.db.pingCheck('MySql DB'),
      () =>
        this.microservice.pingCheck<RedisOptions>('Redis DB', {
          transport: Transport.REDIS,
          options: {
            host: this.config.get<string>('REDIS_HOST'),
            port: this.config.get<number>('REDIS_PORT'),
            username: this.config.get<string>('REDIS_USER'),
            password: this.config.get<string>('REDIS_PASSWORD')
          }
        })
    ])
  }
}
