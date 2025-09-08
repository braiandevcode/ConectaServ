import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskersService } from './taskers.service';
import { CreateTaskerDto } from './dto/create-tasker.dto';
import { UpdateTaskerDto } from './dto/update-tasker.dto';

@Controller('taskers')
export class TaskersController {
  constructor(private readonly taskersService: TaskersService) {}

  @Post()
  create(@Body() createTaskerDto: CreateTaskerDto) {
    return this.taskersService.create(createTaskerDto);
  }

  @Get()
  findAll() {
    return this.taskersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskerDto: UpdateTaskerDto) {
    return this.taskersService.update(+id, updateTaskerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskersService.remove(+id);
  }
}
