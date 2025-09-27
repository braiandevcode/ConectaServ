import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class CreateTaskerDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 150)
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 150)
    userName: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    locationId: string;
}
