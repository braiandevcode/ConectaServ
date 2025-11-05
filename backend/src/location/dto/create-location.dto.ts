import { IsNotEmpty, IsString, IsUUID } from "class-validator";

// DTO LOCATION
export class CreateLocationDto {
    @IsNotEmpty({ message: 'La localidad no puede estar vacia'})
    @IsString({ message: 'La localidad debe ser una cadena de texto'})
    location:string;
}
