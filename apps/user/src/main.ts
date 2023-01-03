import { NestFactory } from '@nestjs/core'
import { UserModule } from './user.module'
import { RabbitmqService } from '@app/common'

async function bootstrap() {
  const app = await NestFactory.create(UserModule)
  const rmqService = app.get<RabbitmqService>(RabbitmqService)
  app.connectMicroservice(rmqService.getOptions('USER'))
  await app.startAllMicroservices()
}
bootstrap()
