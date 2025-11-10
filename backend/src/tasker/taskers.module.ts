import { Module } from '@nestjs/common';
import { TaskersController } from './taskers.controller';
import { TaskersService } from './taskers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasker } from './entities/tasker.entity';
import { Category } from 'src/category/entities/category.entity';
import { DetailsProfileTasker } from 'src/details_profile_taskers/entities/details_profile_tasker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasker, Category, DetailsProfileTasker])],
  controllers: [TaskersController],
  providers: [TaskersService],
})
export class TaskersModule {}
