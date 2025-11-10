import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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
  @IsString({ message: 'password debe ser de tipo string' })
  password: string;

  @IsNotEmpty({ message: 'La localidad no puede estar vacia' })
  @IsString({ message: 'La localidad debe ser una cadena de texto' })
  city: string;

  @IsNotEmpty({ message: 'El role es requerido' })
  @IsString({ message: 'El role debe ser una cadena de texto' })
  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsIn(['client', 'tasker'], {
    message: 'El role debe ser "client" o "tasker"',
  })
  role: string;

  @IsNotEmpty({ message: 'Debe tener un valor' })
  @IsBoolean({ message: 'isVerified debe ser un boolean' })
  isVerified: boolean;
}
