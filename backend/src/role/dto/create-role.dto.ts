import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'La opcion no puede estar vacia "budgeSelected" no puede estar vacio' })
    //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
    @IsIn(['yes', 'no'], { message: 'budgeSelected debe ser "yes" o "no"' })
    budgeSelected: 'yes' | 'no';

    @IsNotEmpty({ message: 'La opcion no puede estar vacia "reinsert" no puede estar vacio' })
    @IsIn(['yes', 'no'], { message: 'reinsert debe ser "yes" o "no"' })
    reinsert: 'yes' | 'no';
}
