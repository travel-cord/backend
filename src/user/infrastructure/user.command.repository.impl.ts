import { UserCommandRepository } from '@user/domain/user.command.repository'
import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@user/infrastructure/entities/user.entity'
import { User } from '@user/domain/user'

export class UserCommandRepositoryImpl implements UserCommandRepository {
  constructor(
    private connection: DataSource,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async save(user: User): Promise<void> {
    await this.connection.transaction(async (manager) => {
      await manager.save(user)
    })
  }

  updateUser(user: User): Promise<User> {
    return Promise.resolve(user)
  }
}
