import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskersService } from './taskers.service';
import { CreateTaskerDto } from './dto/create-tasker.dto';
import { UpdateTaskerDto } from './dto/update-tasker.dto';
import { Category } from 'src/category/entities/category.entity';
import { Tasker } from './entities/tasker.entity';

@Controller('categories')
export class TaskersController {
  constructor(private readonly taskersService: TaskersService) {}

  // @Get(':category/taskers')
  // async getByCategory(@Param('category')category:string): Promise<Tasker[]>{
  //   return this.taskersService.findByCategory(category);
  // }

  @Get('services/:serviceName/taskers')
async getByServiceName(@Param('serviceName') serviceName: string): Promise<Tasker[]> {
  return this.taskersService.findByServiceName(serviceName);
}

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
