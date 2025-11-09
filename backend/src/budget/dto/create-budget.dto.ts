import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber({}, {message: 'El valor del monto debe ser numerico'})
  @Max(100000000)
  amountBudge: number;

  //@IsIn VALIDA QUE EL VALOR ESTÉ DENTRO DE LA LISTA DE OPCIONES
  @IsNotEmpty()
  @IsIn(['yes', 'no'], { message: 'budgeSelected debe ser "yes" o "no"' })
  budgeSelected: 'yes' | 'no';

  @IsNotEmpty()
  @IsIn(['yes', 'no'], { message: 'reinsert debe ser "yes" o "no"' })
  reinsert: 'yes' | 'no';
}
