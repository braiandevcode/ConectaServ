import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StoredImageDto } from 'src/shared/stored-image.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

// DATOS SOLO PARA TASKERS
export class CreateTaskerDto {
  @IsNotEmpty({ message: 'La categoria no puede estar vacia' })
  @IsString({ message: 'La categoria debe ser una cadena de texto' })
  category: string;

  @IsArray({ message: 'los datos de service deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'service no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de service debe ser una cadena de texto',
  })
  service: string[];

  @IsOptional()
  @IsArray({ message: 'los datos de context deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'context no puede estar vacío' })
  @IsNotEmpty({ each: true, message: 'cada elemento no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de context debe ser una cadena de texto',
  })
  context?: string[];

  @IsArray({ message: 'los datos de hour deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'hour no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de hour debe ser una cadena de texto',
  })
  hour: string[];

  @IsArray({ message: 'los datos de day deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'day no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de day debe ser una cadena de texto',
  })
  day: string[];

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

  @IsNumber({}, { message: 'El valor del monto debe ser numerico' })
  amountBudge: number;

  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsNotEmpty()
  @IsIn(['yes', 'no'], { message: 'budgeSelected debe ser "yes" o "no"' })
  budgeSelected: 'yes' | 'no';

  @IsNotEmpty()
  @IsIn(['yes', 'no'], { message: 'reinsert debe ser "yes" o "no"' })
  reinsert: 'yes' | 'no';
}
