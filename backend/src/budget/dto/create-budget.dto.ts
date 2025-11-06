import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  amountBudge: number;
  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsIn(['yes', 'no'], { message: 'budgeSelected debe ser "yes" o "no"' })
  budgeSelected: 'yes' | 'no';

  @IsIn(['yes', 'no'], { message: 'reinsert debe ser "yes" o "no"' })
  reinsert: 'yes' | 'no';
}
