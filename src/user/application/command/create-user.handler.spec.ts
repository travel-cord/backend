import { CreateUserHandler } from '@user/application/command/create-user.handler'
import { Test, TestingModule } from '@nestjs/testing'
import { UserCommandRepositoryImpl } from '@user/infrastructure/user.command.repository.impl'
import { UserQueryRepositoryImpl } from '@user/infrastructure/user.query.repository.impl'
import { CreateUserCommand } from '@user/application/command/create-user.command'
import { UserFactory } from '@user/domain/user.factory'
import { Logger, UnprocessableEntityException } from '@nestjs/common'

describe('CreateUserHandler', () => {
  let createUserHandler: CreateUserHandler
  let userFactory: UserFactory
  let userCommandRepository: UserCommandRepositoryImpl
  let userQueryRepository: UserQueryRepositoryImpl

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        CreateUserHandler,
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn()
          }
        },
        {
          provide: 'UserCommandRepository',
          useValue: { save: jest.fn() }
        },
        {
          provide: 'UserQueryRepository',
          useValue: { save: jest.fn() }
        }
      ]
    }).compile()

    createUserHandler = module.get<CreateUserHandler>(CreateUserHandler)
    userFactory = module.get<UserFactory>(UserFactory)
    userCommandRepository = module.get<UserCommandRepositoryImpl>('UserCommandRepository')
    userQueryRepository = module.get<UserQueryRepositoryImpl>('UserQueryRepository')
  })

  const user = {
    id: 2464438642,
    name: '윤한빈',
    email: 'dbsgksqlschl@naver.com',
    gender: 'male',
    age: 'DENIED',
    birthday: '0312',
    profileImg: 'http://k.kakaocdn.net/dn/bM978U/btqKmou7OGy/JWNhQHr5ZZBeef0KQn7J0k/img_640x640.jpg'
  }

  describe('execute', () => {
    it('should execute CreateUserCommand', async function () {
      const { id, name, email, birthday, age, gender, profileImg } = user

      // Given
      userQueryRepository.selectById = jest.fn().mockResolvedValue(null)

      // When
      const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
      await createUserHandler.execute(command)

      // Then
      expect(userCommandRepository.save).toBeCalledWith(user)
      expect(userFactory.reconstitute).toBeCalledWith(id, name, email, birthday, gender, age, profileImg)
    })

    it('should throw UnprocessableEntityException when user exists', async () => {
      const { id, name, email, birthday, age, gender, profileImg } = user

      // Given
      userQueryRepository.selectById = jest
        .fn()
        .mockResolvedValue({ id, name, email, birthday, age, gender, profileImg })

      // When
      // Then
      await expect(
        createUserHandler.execute(new CreateUserCommand(id, name, email, birthday, age, gender, profileImg))
      ).rejects.toThrowError(UnprocessableEntityException)
    })
  })
})
