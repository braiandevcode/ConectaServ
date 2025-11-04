import { IsNotEmpty, IsString } from "class-validator";

// DTO LOCATION
export class CreateLocationDto {
    @IsNotEmpty({ message: 'Categoría no puede ir vacia'})
    @IsString({ message: 'Categoría debe ser una cadena de texto'})
    location:string;
}
