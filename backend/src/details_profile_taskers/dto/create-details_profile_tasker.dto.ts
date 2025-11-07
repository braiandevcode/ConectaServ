import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StoredImageDto } from 'src/shared/stored-image.dto';

export class CreateDetailsProfileTaskerDto {
  @IsOptional()
  @IsString({ message: 'la descripcion debe ser una cadena de texto' })
  description: string;

  @IsOptional()
  @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
  imageProfile: StoredImageDto;

  @IsOptional()
  @IsArray({
    message: 'los datos de imagen/es de experiencias deben ser un arreglo',
  })
  @ValidateNested({ each: true }) //VALIDA CADA OBJETO
  @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
  imageExperience: StoredImageDto[];
}
