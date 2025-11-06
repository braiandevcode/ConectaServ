import { Module } from '@nestjs/common';
import { TaskersController } from './taskers.controller';
import { TaskersService } from './taskers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasker } from './entities/tasker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasker])],
  controllers: [TaskersController],
  providers: [TaskersService],
})
export class TaskersModule {}
