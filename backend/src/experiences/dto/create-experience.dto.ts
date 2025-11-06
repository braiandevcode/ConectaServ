import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { StoredImageDto } from "src/shared/stored-image.dto";

export class CreateExperienceDto {
    @IsOptional()
    @IsArray({ message: 'los datos de imagen/es de experiencias deben ser un arreglo' })
    @ValidateNested({ each: true }) //VALIDA CADA OBJETO
    @Type(() => StoredImageDto) // TRANSFORMA PLAIN OBJECTS A StoredImageDto
    imageExperience: StoredImageDto[];
}
