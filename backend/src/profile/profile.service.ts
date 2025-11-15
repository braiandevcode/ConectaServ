import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EntityManager, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/config/ErrorMannager';
import { SharedImageDto } from 'src/shared/dtos/shared-image.dto';

@Injectable()
export class ProfileService {
  private readonly logger: Logger = new Logger(ProfileService.name);
  constructor(
    @InjectRepository(Profile)
    private readonly imageProfileRepo: Repository<Profile>,
  ) {}
  async create(
    storedImageProfile: SharedImageDto,
    idTasker: string,
    manager?: EntityManager,
  ): Promise<Profile | null> {
    // PODRIA SER QUE ESTEN EN UN MIDLEWARE O EN OTRO PUNTO DEL PROYECTO
    const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
    try {
      // AQUI SE DEFINE CUAL Repository/Manager USAR
      const repo: Repository<Profile> = manager
        ? manager.getRepository(Profile)
        : this.imageProfileRepo;

      // ENTIDAD IMAGEN DE PERFIL Y EXPERIENCIAS
      //IMAGEN DE  PERFIL
      let imageProfileTasker: Profile | null = null;
      if (storedImageProfile) {
        imageProfileTasker = repo.create({
          ...storedImageProfile,
          tasker: { idTasker },
        });

        this.logger.debug(imageProfileTasker);

        this.logger.debug(imageProfileTasker.size);
        // VERIFICAR EL LIMITE DE TAMAÑO
        if (imageProfileTasker.size > MAX_SIZE_BYTES) {
          ErrorManager.createSignatureError(
            `PAYLOAD_TOO_LARGE :: El tamaño del archivo excede el límite permitido.`,
          );
        }

        this.logger.debug(imageProfileTasker.mimeType);
        this.logger.debug(imageProfileTasker.originalName);

        // VERIFICAR SI EL MIME/TYPE CUMPLE O LA EXTENCION
        if (!imageProfileTasker.mimeType.match(/(image\/jpg|jpeg|png|webp)$/) || !imageProfileTasker.originalName.match(/\.(jpg|jpeg|png|webp)$/)) {
          ErrorManager.createSignatureError(
            `UNSUPPORTED_MEDIA_TYPE :: Tipo de archivo no soportado.`,
          );
        }

        let base64Content: string | undefined; //STRING O INDEFINIDO

        //LIMPIEZA Y DECODIFICACION
        // EXTRAE SOLO LA PARTE DE LOS DATOS DE BASE64, QUITA EL PREFIJO ==>  "data:mime/type;base64,"
        base64Content = storedImageProfile.dataUrl.split(';base64,').pop();

        if (base64Content) {
          //CONVIERTE EL STRING Base64 A UN BUFFER BINARIO
          // ES MAS EFICIENTR QUE GUARDAR EL STRING LARGO
          const imageBuffer: Buffer = Buffer.from(base64Content, 'base64');

          imageProfileTasker.imageBase64 = imageBuffer;

          imageProfileTasker = await repo.save(imageProfileTasker);
        }

        this.logger.debug(imageProfileTasker);
      }
      return imageProfileTasker;
    } catch (error) {
      const err = error as HttpException;

      this.logger.error(err.message, err.stack);
      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;

      // SI NO, CREO UN ERROR 500 GENÉRICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
