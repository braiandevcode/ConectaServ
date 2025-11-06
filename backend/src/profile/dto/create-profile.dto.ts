import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { StoredImageDto } from 'src/shared/stored-image.dto';

export class CreateProfileDto {
  @IsOptional()
  @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
  imageProfile: StoredImageDto;
}
