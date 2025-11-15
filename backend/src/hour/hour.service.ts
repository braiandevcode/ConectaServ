import { Injectable } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';

@Injectable()
export class HourService {
  create(createHourDto: CreateHourDto) {
    return 'This action adds a new hour';
  }

  findAll() {
    return `This action returns all hour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hour`;
  }

  update(id: number, updateHourDto: UpdateHourDto) {
    return `This action updates a #${id} hour`;
  }

  remove(id: number) {
    return `This action removes a #${id} hour`;
  }
}
