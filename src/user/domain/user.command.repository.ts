import { User } from '@user/domain/user'

export interface UserCommandRepository {
  save(user: User): Promise<void>

  updateUser(user: User): Promise<User>
}
