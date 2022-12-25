import { UserQueryRepository } from '@user/domain/user.query.repository'
import { User } from '@user/domain/user'
import { Injectable, Logger } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@user/infrastructure/entities/user.entity'
import { UserFactory } from '@user/domain/user.factory'

@Injectable()
export class UserQueryRepositoryImpl implements UserQueryRepository {
  constructor(
    private logger: Logger,
    private connection: DataSource,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private userFactory: UserFactory
  ) {}

  async selectAll(): Promise<User[]> {
    const userEntity = await this.userRepository.find()
    return userEntity.map((entity) =>
      this.userFactory.reconstitute(
        entity.id,
        entity.name,
        entity.email,
        entity.birthday,
        entity.gender,
        entity.age,
        entity.profileImg
      )
    )
  }

  async selectById(userId: string | number): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ id: userId })
    if (!userEntity) {
      return null
    }

    const { id, name, email, birthday, gender, age, profileImg } = userEntity
    return this.userFactory.reconstitute(id, name, email, birthday, gender, age, profileImg)
  }
}
