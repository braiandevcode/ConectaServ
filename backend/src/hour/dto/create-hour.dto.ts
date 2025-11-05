import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class CreateHourDto {
  @IsArray({ message: 'los datos de hour deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'hour no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de hour debe ser una cadena de texto',
  })
  hour: string[];
}
