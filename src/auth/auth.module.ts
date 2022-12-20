import { Logger, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from '@auth/interface/auth.controller'
import { GoogleStrategy, KakaoStrategy, NaverStrategy } from '@auth/interface/strategies'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from '@user/user.module'

const strategies = [GoogleStrategy, KakaoStrategy, NaverStrategy]

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: 'fds',
      signOptions: { expiresIn: '24h' }
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [Logger, ...strategies]
})
export class AuthModule {}
