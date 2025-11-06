import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsProfileTaskerDto } from './create-details_profile_tasker.dto';

export class UpdateDetailsProfileTaskerDto extends PartialType(CreateDetailsProfileTaskerDto) {}
