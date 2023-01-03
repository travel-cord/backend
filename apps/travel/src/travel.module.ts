import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
