import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { StoredImageDto } from "src/shared/stored-image.dto";

export class CreateExperienceDto {
    @IsArray({ message: 'los datos de imagen/es de experiencias deben ser un arreglo' })
    @ArrayNotEmpty()
    @ValidateNested({ each: true }) //VALIDA CADA OBJETO
    @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
    imageExperience: StoredImageDto[];
}
