import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from './entities/context.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Context])],
  controllers: [ContextController],
  providers: [ContextService],
})
export class ContextModule {}
