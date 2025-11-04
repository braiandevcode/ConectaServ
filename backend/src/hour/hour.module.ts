import { Module } from '@nestjs/common';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';

@Module({
  controllers: [HourController],
  providers: [HourService],
})
export class HourModule {}
