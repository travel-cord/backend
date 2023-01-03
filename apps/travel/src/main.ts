import { NestFactory } from '@nestjs/core'
import { TravelModule } from './travel.module'

async function bootstrap() {
  const app = await NestFactory.create(TravelModule)
  await app.listen(3000)
}
bootstrap()
