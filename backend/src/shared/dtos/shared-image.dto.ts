import { IsString, IsNumber, IsNotEmpty, IsBase64 } from 'class-validator';

export class SharedImageDto {
  @IsNotEmpty({ message: 'nombre de imagen no puede estar vacio ' })
  @IsString({ message: 'El nombre de la imagen debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'tipo de imagen no puede estar vacio ' })
  @IsString({ message: 'El tipo de la imagen debe ser una cadena de texto' })
  type: string;

  @IsNumber({}, { message: 'El tamaño de la imagen debe ser un número' })
  size: number;

  @IsNotEmpty({ message: 'texto de datUrl de imagen no puede estar vacio ' })
  @IsString({ message: 'El dataUrl de la imagen debe ser una cadena de texto' })
  @IsBase64()
  dataUrl: string;
}