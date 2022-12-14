import { ICommand } from '@nestjs/cqrs'

export class CreateUserCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name: string,

    readonly email?: string,
    readonly birthday?: string,
    readonly age?: string,
    readonly gender?: string,
    readonly profileImg?: string
  ) {}
}
