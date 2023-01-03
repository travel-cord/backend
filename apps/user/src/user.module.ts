import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { ConfigModule } from '@nestjs/config'
import { CommonModule, RabbitmqModule } from '@app/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env.dev'
    }),
    CommonModule,
    RabbitmqModule.register({ name: 'USER' })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
