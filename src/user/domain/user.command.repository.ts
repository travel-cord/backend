import { User } from '@user/domain/user'

export interface UserCommandRepository {
  save(user: User): Promise<any>

  updateUser(user: User): Promise<User>
}
