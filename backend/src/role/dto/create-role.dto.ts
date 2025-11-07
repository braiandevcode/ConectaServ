import { ArrayNotEmpty, IsArray, IsIn } from 'class-validator';

export class CreateRoleDto {
  @IsArray({ message: 'El valor de be ser un array' })
  @ArrayNotEmpty()
  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsIn(['client', 'tasker'], {
    message: 'El role debe ser "client" o "tasker"',
  })
  roles: string[];
}
