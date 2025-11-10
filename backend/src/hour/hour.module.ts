import { Module } from '@nestjs/common';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hour } from './entities/hour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hour])],
  controllers: [HourController],
  providers: [HourService],
})
export class HourModule {}
