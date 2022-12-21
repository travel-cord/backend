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
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const userEntity = this.userRepository.create({ ...user })
      await this.userRepository.save(userEntity)
      await queryRunner.commitTransaction()
    } catch (error) {
      this.logger.error(error, error.stack, 'db-error')
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
    // await this.connection.transaction(async (manager) => {
    //   await manager.save(user)
    // })
  }

  updateUser(user: User): Promise<User> {
    return Promise.resolve(user)
  }
}
