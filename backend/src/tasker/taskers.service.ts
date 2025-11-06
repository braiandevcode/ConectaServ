import { Injectable } from '@nestjs/common';
import { CreateTaskerDto } from './dto/create-tasker.dto';
import { UpdateTaskerDto } from './dto/update-tasker.dto';
// import { Tasker } from './entities/tasker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasker } from './entities/tasker.entity';

@Injectable()
export class TaskersService {
  constructor(
    @InjectRepository(Tasker)
    private readonly taskerRepo: Repository<Tasker>,
  ) {}

  async findByServiceName(name: string): Promise<Tasker[]> {
    return this.taskerRepo.find({
      // relations: ['services'],
      where: {
        services: { serviceName: name },
      },
    });
  }

  create(createTaskerDto: CreateTaskerDto) {
    return 'This action adds a new tasker';
  }

  findAll() {
    return `This action returns all taskers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasker`;
  }

  update(id: number, updateTaskerDto: UpdateTaskerDto) {
    return `This action updates a #${id} tasker`;
  }

  remove(id: number) {
    return `This action removes a #${id} tasker`;
  }
}
