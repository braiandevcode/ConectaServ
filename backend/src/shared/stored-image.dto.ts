import { IsString, IsNumber, IsUUID, IsNotEmpty, IsBase64, Max } from 'class-validator';

export class StoredImageDto {
  @IsNotEmpty({ message: 'nombre de imagen no puede estar vacio ' })
  @IsString({ message: 'El nombre de la imagen debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'tipo de imagen no puede estar vacio ' })
  @IsString({ message: 'El tipo de la imagen debe ser una cadena de texto' })
  type: string;

  @IsNumber({}, { message: 'El tamaño de la imagen debe ser un número' })
  size: number;

  @IsNotEmpty({ message: 'id de imagen no puede estar vacio ' })
  @IsString({ message: 'El id de la imagen debe ser una cadena de texto' })
  @IsUUID('4', { message: 'El id de la imagen debe ser un UUID válido' })
  idImage: string;

  @IsNotEmpty({ message: 'texto de datUrl de imagen no puede estar vacio ' })
  @IsString({ message: 'El dataUrl de la imagen debe ser una cadena de texto' })
  @IsBase64()
  dataUrl: string;
}