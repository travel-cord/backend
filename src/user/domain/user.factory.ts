import { Injectable } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { User } from '@user/domain/user'

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  create(
    id: string | number,
    name: string,
    email?: string,
    birthday?: string,
    gender?: string,
    age?: string,
    profileImg?: string
  ): User {
    return new User(id, name, email, birthday, gender, age, profileImg)
  }

  reconstitute(
    id: string | number,
    name: string,
    email?: string,
    birthday?: string,
    gender?: string,
    age?: string,
    profileImg?: string
  ) {
    return new User(id, name, email, birthday, gender, age, profileImg)
  }
}
