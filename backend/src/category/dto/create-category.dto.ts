import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'La categoria no puede estar vacia' })
  @IsString({ message: 'La categoria debe ser una cadena de texto' })
  category: string;
}
