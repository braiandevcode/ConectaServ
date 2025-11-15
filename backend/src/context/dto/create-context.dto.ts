import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContextDto {
  @IsOptional()
  @IsArray({ message: 'los datos de context deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'context no puede estar vacío' })
  @IsNotEmpty({ each: true, message: 'cada elemento no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de context debe ser una cadena de texto',
  })
  context: string[];
}
