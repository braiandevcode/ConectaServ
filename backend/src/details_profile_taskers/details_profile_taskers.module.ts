import { Module } from '@nestjs/common';
import { DetailsProfileTaskersService } from './details_profile_taskers.service';
import { DetailsProfileTaskersController } from './details_profile_taskers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsProfileTasker } from './entities/details_profile_tasker.entity';

// MODULO 'details_profile_taskers'
@Module({
  imports:[TypeOrmModule.forFeature([DetailsProfileTasker])],
  controllers: [DetailsProfileTaskersController],
  providers: [DetailsProfileTaskersService],
})
export class DetailsProfileTaskersModule {}
