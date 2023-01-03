import { Test, TestingModule } from '@nestjs/testing'
import { TravelController } from './travel.controller'
import { TravelService } from './travel.service'

describe('TravelController', () => {
  let travelController: TravelController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TravelController],
      providers: [TravelService]
    }).compile()

    travelController = app.get<TravelController>(TravelController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(travelController.getHello()).toBe('Hello World!')
    })
  })
})
