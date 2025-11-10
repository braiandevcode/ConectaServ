import {
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsNotEmpty({ message: 'El role es requerido' })
  @IsString({ message: 'El role debe ser una cadena de texto' })
  @IsIn(['client', 'tasker'], {
    message: 'El role debe ser "client" o "tasker"',
  })
  role: string;
}
