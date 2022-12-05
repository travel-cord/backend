import { Module } from '@nestjs/common'
import { CustomConfigModule } from '@config/config.module'
import { AuthModule } from '@auth/auth.module'

@Module({
  imports: [CustomConfigModule, AuthModule]
})
export class AppModule {}
