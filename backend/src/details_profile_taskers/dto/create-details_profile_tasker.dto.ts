import { IsOptional, IsString } from 'class-validator';
import { CreateExperienceDto } from 'src/experiences/dto/create-experience.dto';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

export class CreateDetailsProfileTaskerDto {
  @IsOptional()
  @IsString({ message: 'la descripcion debe ser una cadena de texto' })
  description: string;

  imageProfile: CreateProfileDto; //VALIDA ENTRADA DE PERFIL

  imageExperiences: CreateExperienceDto; //VALIDA ENTRADA DE EXPERIENCIAS
}
