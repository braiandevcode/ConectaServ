import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ELocations } from 'src/types/enums/enumLocations';

// DTO LOCATION
export class CreateLocationDto {
  @IsNotEmpty({ message: 'La localidad no puede estar vacia' })
  @IsString({ message: 'La localidad debe ser una cadena de texto' })
  @IsEnum(ELocations,  { message: 'La ciudad no es una ubicación permitida.' })
  cityName: ELocations;
}
