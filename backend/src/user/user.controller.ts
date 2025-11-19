import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/shared/multer.options';
import { TotalSizeValidationPipe } from 'src/shared/pipes/total-size-validation.pipe';
import { ParseJsonPipe } from 'src/shared/pipes/parse-json.pipe';

@Controller('api')
export class UserController {
  private readonly logger:Logger = new Logger(UserController.name)
  constructor(private readonly userService: UserService) {}

@Post('/users')
// INTERCEPTAR AMBOS CAMPOS
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'imageProfile', maxCount: 1 }, // EL CAMPO DEL PERFIL
    { name: 'imageExperiences', maxCount: 10 }, // CAMPO DE EXPERIENCIAS HASTA 10
  ], multerOptions)
)
create(
  // RECUPERA UN OBJETO CON TODOS LOS CAMPOS SEPARADOS POR NOMBRE.
  @UploadedFiles() files: {
    imageProfile?: Express.Multer.File[], 
    imageExperiences?: Express.Multer.File[] 
  },
  @Body('data', ParseJsonPipe, new ValidationPipe({ transform: true, whitelist:true, forbidNonWhitelisted:true })) createUserDto: CreateUserDto,
) {

  this.logger.error(files)

  const profileFile: Express.Multer.File | null = files.imageProfile?.[0] || null;
  const experienceFiles: Express.Multer.File[] = files.imageExperiences || [];

  this.logger.debug(profileFile)
  this.logger.debug(experienceFiles);
  
  // EXTRAER Y APLICAR EL PIPE SOLO EN IMAGENES DE EXPERIENCIAS 
  const validatedExperienceFiles: Express.Multer.File[] = new TotalSizeValidationPipe().transform(experienceFiles);

  this.logger.debug(validatedExperienceFiles)

  //LLAMAR AL SERVICIO
  return this.userService.create(
    profileFile, //ARCHIVO PERFIL
    validatedExperienceFiles, //ARCHIVOS EXPERIENCIAS VALIDADOS
    createUserDto
  );
}

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
