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
    const user = this.userQueryRepository.selectById(id)
    this.logger.debug(user, 'handler')
    if (user !== null && user !== undefined) {
      throw new UnprocessableEntityException('이미 가입한 계정입니다')
    }
    const userEntity = this.userFactory.reconstitute(id, name, email, birthday, gender, age, profileImg)
    await this.userCommandRepository.save(userEntity)
  }
}
