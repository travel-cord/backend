import { Controller, Get } from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller()
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get()
  getHello(): string {
    return this.travelService.getHello();
  }
}
