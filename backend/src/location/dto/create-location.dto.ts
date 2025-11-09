import { IsNotEmpty, IsString } from "class-validator";

// DTO LOCATION
export class CreateLocationDto {
    @IsNotEmpty({ message: 'La localidad no puede estar vacia'})
    @IsString({ message: 'La localidad debe ser una cadena de texto'})
    city:string;
}
