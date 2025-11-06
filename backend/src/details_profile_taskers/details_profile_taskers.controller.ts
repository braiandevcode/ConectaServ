import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailsProfileTaskersService } from './details_profile_taskers.service';
import { CreateDetailsProfileTaskerDto } from './dto/create-details_profile_tasker.dto';
import { UpdateDetailsProfileTaskerDto } from './dto/update-details_profile_tasker.dto';

@Controller('details-profile-taskers')
export class DetailsProfileTaskersController {
  constructor(private readonly detailsProfileTaskersService: DetailsProfileTaskersService) {}

  @Post()
  create(@Body() createDetailsProfileTaskerDto: CreateDetailsProfileTaskerDto) {
    return this.detailsProfileTaskersService.create(createDetailsProfileTaskerDto);
  }

  @Get()
  findAll() {
    return this.detailsProfileTaskersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsProfileTaskersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailsProfileTaskerDto: UpdateDetailsProfileTaskerDto) {
    return this.detailsProfileTaskersService.update(+id, updateDetailsProfileTaskerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsProfileTaskersService.remove(+id);
  }
}
