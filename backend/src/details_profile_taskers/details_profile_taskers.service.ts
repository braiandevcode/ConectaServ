import { Injectable } from '@nestjs/common';
import { CreateDetailsProfileTaskerDto } from './dto/create-details_profile_tasker.dto';
import { UpdateDetailsProfileTaskerDto } from './dto/update-details_profile_tasker.dto';

@Injectable()
export class DetailsProfileTaskersService {
  create(createDetailsProfileTaskerDto: CreateDetailsProfileTaskerDto) {
    return 'This action adds a new detailsProfileTasker';
  }

  findAll() {
    return `This action returns all detailsProfileTaskers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailsProfileTasker`;
  }

  update(id: number, updateDetailsProfileTaskerDto: UpdateDetailsProfileTaskerDto) {
    return `This action updates a #${id} detailsProfileTasker`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailsProfileTasker`;
  }
}
