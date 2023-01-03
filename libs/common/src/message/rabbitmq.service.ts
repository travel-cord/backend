import { Injectable } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RabbitmqService {
  constructor(private readonly config: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get<string>('RABBIT_MQ_URI')],
        queue: this.config.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true
      }
    }
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()
    if (originalMessage instanceof RmqContext) {
      channel.ack(originalMessage)
    }
  }
}
