import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './interface/auth.controller'
import { MyLogger } from '@config/logger.config'
import { GoogleStrategy, KakaoStrategy, NaverStrategy } from './interface/strategies'

const strategies = [GoogleStrategy, KakaoStrategy, NaverStrategy]

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: 'fds',
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [AuthController],
  providers: [MyLogger, ...strategies]
})
export class AuthModule {}
