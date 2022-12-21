import { CreateUserHandler } from '@user/application/command/create-user.handler'
import { Test } from '@nestjs/testing'
import { UserCommandRepositoryImpl } from '@user/infrastructure/user.command.repository.impl'
import { UserQueryRepositoryImpl } from '@user/infrastructure/user.query.repository.impl'
import { CreateUserCommand } from '@user/application/command/create-user.command'
import { UserFactory } from '@user/domain/user.factory'

describe('CreateUserHandler', () => {
  let createUserHandler: CreateUserHandler
  let userFactory: UserFactory
  let userCommandRepository: UserCommandRepositoryImpl
  let userQueryRepository: UserQueryRepositoryImpl

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn()
          }
        },
        {
          provide: 'UserCommandRepositoryImpl',
          useValue: { save: jest.fn() }
        },
        {
          provide: 'UserQueryRepositoryImpl',
          useValue: { save: jest.fn() }
        }
      ]
    }).compile()

    createUserHandler = module.get(CreateUserHandler)
    userFactory = module.get(UserFactory)
    userCommandRepository = module.get('UserCommandRepositoryImpl')
    userQueryRepository = module.get('UserQueryRepositoryImpl')
  })

  const id = 2464438642
  const name = '윤한빈'
  const email = 'dbsgksqlschl@naver.com'
  const gender = 'male'
  const age = 'DENIED'
  const birthday = '0312'
  const profileImg = 'http://k.kakaocdn.net/dn/bM978U/btqKmou7OGy/JWNhQHr5ZZBeef0KQn7J0k/img_640x640.jpg'

  describe('execute', () => {
    it('should execute CreateUserCommand', async function () {
      userQueryRepository.selectById = jest.fn().mockResolvedValue(null)
      userCommandRepository.save = jest.fn().mockResolvedValue(null)
      userFactory.reconstitute(id, name, email, birthday, gender, age, profileImg)
      const command = new CreateUserCommand(id, name, email, birthday, age, gender, profileImg)
      await expect(createUserHandler.execute(command))
    })
  })
})
