import { DynamicModule, Module } from '@nestjs/common'
import { RabbitmqService } from '@app/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

interface RabbitmqModuleOptions {
  name: string
}
@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService]
})
export class RabbitmqModule {
  static register({ name }: RabbitmqModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (config: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [config.get<string>('RABBIT_MQ_URI')],
                queue: config.get<string>(`RABBIT_MQ_${name}_QUEUE`)
              }
            }),
            inject: [ConfigService]
          }
        ])
      ],
      exports: [ClientsModule]
    }
  }
}
