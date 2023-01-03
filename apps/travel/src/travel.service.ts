import { Injectable } from '@nestjs/common'

@Injectable()
export class TravelService {
  getHello(): string {
    return 'Hello World!'
  }
}
