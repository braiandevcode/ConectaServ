import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsArray({ message: 'los datos de service deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'service no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de service debe ser una cadena de texto',
  })
  service: string[];
}
