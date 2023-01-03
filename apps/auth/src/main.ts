import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { RabbitmqService } from '@app/common'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)
  const rmqService = app.get<RabbitmqService>(RabbitmqService)
  app.connectMicroservice(rmqService.getOptions('AUTH'))
  await app.startAllMicroservices()
}
bootstrap()
