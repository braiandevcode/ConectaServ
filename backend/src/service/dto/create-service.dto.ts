import { ArrayNotEmpty, IsArray, IsEnum, IsString } from 'class-validator';
import { EServiceGarden } from 'src/types/enums/enumServiceGarden';
import { EServiceMoving } from 'src/types/enums/enumServicesMoving';

export class CreateServiceDto {
  @IsArray({ message: 'los datos de service deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'service no puede estar vacío' })
  @IsString({
    each: true,
    message: 'cada elemento de service debe ser una cadena de texto',
  })

  @IsEnum([EServiceGarden, EServiceGarden, EServiceMoving], { message: 'Los servicios elegidos no son validos.' })
  service: string[];
}
