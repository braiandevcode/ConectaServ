import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsObject, IsOptional } from 'class-validator';
import { StoredImageDto } from 'src/shared/stored-image.dto';

export class CreateProfileDto {
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto SI NO ES UNA INSTANCIA LA TRANSFORMA 
  imageProfile: StoredImageDto;
}
