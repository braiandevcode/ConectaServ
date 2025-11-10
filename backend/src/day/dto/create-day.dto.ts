import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateDayDto {
  @IsArray({ message: 'los datos de day deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'Arreglo de day no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de day debe ser una cadena de texto',
  })
  day: string[];
}
