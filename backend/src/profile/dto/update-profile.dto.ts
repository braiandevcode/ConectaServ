import { PartialType } from '@nestjs/mapped-types';
import { SharedImageDto } from 'src/shared/dtos/shared-image.dto';

export class UpdateProfileDto extends PartialType(SharedImageDto) {}
