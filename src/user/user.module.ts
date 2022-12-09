import { Logger, Module } from '@nestjs/common'
import { UserController } from '@user/interface/user.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CustomConfigModule } from '@config/config.module'

@Module({
  imports: [CqrsModule, CustomConfigModule],
  controllers: [UserController],
  providers: [Logger]
})
export class UserModule {}
