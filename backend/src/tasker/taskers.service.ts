import { Injectable } from '@nestjs/common';
import { CreateTaskerDto } from './dto/create-tasker.dto';
import { UpdateTaskerDto } from './dto/update-tasker.dto';

@Injectable()
export class TaskersService {
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
