import { Type } from 'class-transformer';
import { StoredImageDto } from 'src/shared/stored-image.dto';

export class CreateProfileDto {
  @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
  imageProfile: StoredImageDto;
}
