import { UserCommandRepository } from '@user/domain/user.command.repository'
import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@user/infrastructure/entities/user.entity'
import { User } from '@user/domain/user'
import { Logger } from '@nestjs/common'

export class UserCommandRepositoryImpl implements UserCommandRepository {
  constructor(
    private readonly logger: Logger,
    private connection: DataSource,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async save(user: User): Promise<any> {
    await this.connection.manager.transaction('SERIALIZABLE', async (transactionalEntityManager) => {
      const userEntity = this.userRepository.create({ ...user })
      return await transactionalEntityManager.save(userEntity)
    })
  }
  updateUser(user: User): Promise<User> {
    return Promise.resolve(user)
  }
}
