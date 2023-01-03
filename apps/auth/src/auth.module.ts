import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule } from '@nestjs/config'
import { CommonModule, RabbitmqModule } from '@app/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env.dev'
    }),
    CommonModule,
    RabbitmqModule.register({ name: 'AUTH' })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
