import { Logger, Module } from '@nestjs/common'
import { UserController } from '@user/interface/user.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CustomConfigModule } from '@config/config.module'
import { UserCommandRepositoryImpl } from '@user/infrastructure/user.command.repository.impl'
import { UserQueryRepositoryImpl } from '@user/infrastructure/user.query.repository.impl'
import { UserFactory } from '@user/domain/user.factory'
import { UserEntity } from '@user/infrastructure/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

const repositories = [
  { provide: 'UserCommandRepositoryImpl', useClass: UserCommandRepositoryImpl },
  { provide: 'UserQueryRepositoryImpl', useClass: UserQueryRepositoryImpl }
]

const factories = [UserFactory]

@Module({
  imports: [CqrsModule, CustomConfigModule, TypeOrmModule.forFeature([UserEntity], 'MEMBER')],
  controllers: [UserController],
  providers: [Logger, ...repositories, ...factories]
})
export class UserModule {}
