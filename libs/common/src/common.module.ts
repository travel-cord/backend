import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { MysqlModule } from '@app/common/database/mysql.module'
import { RedisModule } from '@app/common/database/redis.module'

@Module({
  imports: [MysqlModule, RedisModule],
  providers: [CommonService],
  exports: [CommonService]
})
export class CommonModule {}
