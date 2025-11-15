import { PartialType } from '@nestjs/mapped-types';
import { SharedImageDto } from 'src/shared/dtos/shared-image.dto';

export class UpdateExperienceDto extends PartialType(SharedImageDto) {}
