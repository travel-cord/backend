import { Logger, Module } from '@nestjs/common'
import { UserController } from '@user/interface/user.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { UserCommandRepositoryImpl } from '@user/infrastructure/user.command.repository.impl'
import { UserQueryRepositoryImpl } from '@user/infrastructure/user.query.repository.impl'
import { UserFactory } from '@user/domain/user.factory'
import { UserEntity } from '@user/infrastructure/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUserHandler } from '@user/application/command/create-user.handler'

const commandHandler = [CreateUserHandler]

const repositories = [
  { provide: 'UserCommandRepository', useClass: UserCommandRepositoryImpl },
  { provide: 'UserQueryRepository', useClass: UserQueryRepositoryImpl }
]

const factories = [UserFactory]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [Logger, ...repositories, ...factories, ...commandHandler],
  exports: [...commandHandler]
})
export class UserModule {}
