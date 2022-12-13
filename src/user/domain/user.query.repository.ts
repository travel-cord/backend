import { User } from '@user/domain/user'

export interface UserQueryRepository {
  selectAll(): Promise<User[]>
  selectById(id: string | number): Promise<User | null>
}
