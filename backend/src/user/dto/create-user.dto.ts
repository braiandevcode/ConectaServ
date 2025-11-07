import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { StoredImageDto } from 'src/shared/stored-image.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nombre completo no puede estar vacio' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto ' })
  fullName: string;

  @IsNotEmpty({ message: 'Nombre completo no puede estar vacio' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto ' })
  userName: string;

  @IsNotEmpty({ message: 'El email no puede estar vacio' })
  @IsEmail()
  @IsString({ message: 'Email debe ser un texto y email valido' })
  email: string;

  @IsNotEmpty({ message: 'Password requerido' })
  @IsUUID() // ==> QUE SEA FORMATO UUID
  password: string;

  @IsNotEmpty({ message: 'La localidad no puede estar vacia' })
  @IsString({ message: 'La localidad debe ser una cadena de texto' })
  location: string;

  @IsArray({ message: 'El valor de be ser un array' })
  @ArrayNotEmpty()
  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsIn(['client', 'tasker'], {
    message: 'El role debe ser "client" o "tasker"',
  })
  roles: string[];

  @IsNotEmpty({ message: 'Debe tener un valor' })
  @IsBoolean({ message: 'isVerified debe ser un boolean' })
  isVerified: boolean;
}
