import { Logger, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from '@auth/interface/auth.controller'
import { GoogleStrategy, KakaoStrategy, NaverStrategy } from '@auth/interface/strategies'
import { ConfigModule } from '@nestjs/config'

const strategies = [GoogleStrategy, KakaoStrategy, NaverStrategy]

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: 'tc',
      signOptions: { expiresIn: '24h' }
    })
  ],
  controllers: [AuthController],
  providers: [Logger, ...strategies]
})
export class AuthModule {}
