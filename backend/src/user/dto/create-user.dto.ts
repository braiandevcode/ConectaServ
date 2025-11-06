import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';

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

  location: CreateLocationDto; //TOMO EL DTO DE CATERIA QUE YA VALIDA

  role:CreateRoleDto; //==> VALIDAR ROLES

  @IsNotEmpty({ message: 'Debe tener un valor'})
  @IsBoolean({ message: 'isVerified debe ser un boolean' })
  isVerified:boolean;
}
