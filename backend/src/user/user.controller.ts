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
import { iMessageResponseStatus } from 'src/interface/iMessagesResponseStatus';
import { UserIdentifyEmailDto } from './dto/user-identify-email-dto';

@Controller('api')
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post('/v1/users')
  // INTERCEPTAR AMBOS CAMPOS
  @UseInterceptors(FileFieldsInterceptor([
        { name: 'imageProfile', maxCount: 1 }, // EL CAMPO DEL PERFIL
        { name: 'imageExperiences', maxCount: 10 }, // CAMPO DE EXPERIENCIAS HASTA 10
      ],
      multerOptions,
  ))
  create(
    // RECUPERA UN OBJETO CON TODOS LOS CAMPOS SEPARADOS POR NOMBRE.
    @UploadedFiles()
    files: {
      imageProfile?: Express.Multer.File[];
      imageExperiences?: Express.Multer.File[];
    },
    @Body(
      'data',
      ParseJsonPipe,
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    this.logger.error(files);

    const profileFile: Express.Multer.File | null =
      files.imageProfile?.[0] || null;
    const experienceFiles: Express.Multer.File[] = files.imageExperiences || [];

    this.logger.debug(profileFile);
    this.logger.debug(experienceFiles);

    // EXTRAER Y APLICAR EL PIPE SOLO EN IMAGENES DE EXPERIENCIAS
    const validatedExperienceFiles: Express.Multer.File[] =
      new TotalSizeValidationPipe().transform(experienceFiles);

    this.logger.debug(validatedExperienceFiles);

    //LLAMAR AL SERVICIO
    return this.userService.create(
      profileFile, //ARCHIVO PERFIL
      validatedExperienceFiles, //ARCHIVOS EXPERIENCIAS VALIDADOS
      createUserDto,
    );
  }

  // LEER TODOS LOS USUARIOS (SIN IMPLEMENTAR)
  @Get('/v1/users')
  findAll() {
    return this.userService.findAll();
  }

  // BUSCAR USUARIO POR ID (SIN IMPLEMENTAR)
  @Get('/v1/users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // IDENTIFICAR UN USUARIO POR SU EMAIL
  @Post('/v1/users/identify')
  async getUserEmailActive(@Body() userIdentifyEmailDto: UserIdentifyEmailDto): Promise<iMessageResponseStatus> {
    return await this.userService.getUserEmailActive(userIdentifyEmailDto);
  }

  // EDITAR DATOS DE UN USUARIO (SIN IMPLEMENTAR)
  @Patch('/v1/users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // ELIMNAR DE FORMA FISICA UN USUARIO SIN IMPLEMENTAR
  @Delete('/v1/users/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
