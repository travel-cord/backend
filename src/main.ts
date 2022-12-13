import { NestFactory } from '@nestjs/core'
import { CorsConfig } from '@config/cors.config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { MyLogger } from '@config/logger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors(CorsConfig)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 변환 허용
      whitelist: true, // 유효성 검사 데코레이터가 없는 필드를 요청 할 경우 건너뜀
      forbidNonWhitelisted: true, // 유효성 검사 데코레이터가 없는 필드가 있을 경우 에러를 반환
      skipMissingProperties: true // null, undefined 값을 가진 객체는 유효성 검사를 건너뜀
    })
  )
  app.useLogger(app.get<MyLogger>(MyLogger))
  await app.listen(3001)
}

bootstrap()
