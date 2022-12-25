import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '@user/application/command/create-user.command'
import { UserFactory } from '@user/domain/user.factory'
import { UserCommandRepository } from '@user/domain/user.command.repository'
import { UserQueryRepository } from '@user/domain/user.query.repository'

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    private logger: Logger,
    @Inject('UserCommandRepository') private userCommandRepository: UserCommandRepository,
    @Inject('UserQueryRepository') private userQueryRepository: UserQueryRepository
  ) {}

  async execute(command: CreateUserCommand) {
    const { id, name, email, birthday, gender, age, profileImg } = command
    const user = await this.userQueryRepository.selectById(id)
    if (user) {
      return user
    }
    const userEntity = this.userFactory.reconstitute(id, name, email, birthday, gender, age, profileImg)
    return await this.userCommandRepository.save(userEntity)
  }
}
