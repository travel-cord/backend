import { Module } from '@nestjs/common'
import { CustomConfigModule } from '@config/config.module'
import { AuthModule } from '@auth/auth.module'
import { UserModule } from '@user/user.module'

@Module({
  imports: [CustomConfigModule, AuthModule, UserModule]
})
export class AppModule {}
