import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { EntityManager, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/ErrorMannager';
import { SharedImageDto } from 'src/shared/dtos/shared-image.dto';

@Injectable()
export class ExperiencesService {
  private readonly logger: Logger = new Logger(ExperiencesService.name);
  constructor( @InjectRepository(Experience) private readonly imageExperienceRepo: Repository<Experience>) {}
 
  async create( storedImageDto: SharedImageDto[], idTasker: string, manager?: EntityManager): Promise<Experience[]> {
    const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB TAMAÑO INDIVIDUAL
    const MAX_IMAGES: number = 10;
    const MAX_TOTAL_SIZE_BYTES: number = 50 * 1024 * 1024; // 50MB TOTAL PERMITIDO

    const repo: Repository<Experience> = manager
      ? manager.getRepository(Experience)
      : this.imageExperienceRepo;

    try {
      // CANTIDAD DE IMAGENES
      if (storedImageDto.length > MAX_IMAGES) {
        ErrorManager.createSignatureError(
          `BAD_REQUEST :: La cantidad de imagenes exedió el limite de ${MAX_IMAGES}.`,
        );
      }

      let totalSize:number = 0; //CONTADOR AUX

      // CREAR LAS PROMESAS DE GUARDADO USANDO MAP
      const savePromises: Promise<Experience>[] = storedImageDto.map(async (imageDto) => {
        // VALIDAR EL TAMAÑO INDIVIDUAL Y TIPO DE ARCHIVO ==> SE EJECUTA PARA CADA IMAGEN
        if (imageDto.size > MAX_SIZE_BYTES) {
          ErrorManager.createSignatureError(
            `PAYLOAD_TOO_LARGE :: El tamaño de la imagen ${imageDto.name} excede el límite de ${MAX_SIZE_BYTES / (1024 * 1024)}MB.`,
          );
        }

        // SI NO HACE MATCH EN LOS TIPOS DE EXTENCION O EN EL NAME DEL ARCHIVO NO HACE MATCH
        if (!imageDto.type.match(/(image\/jpg|jpeg|png|webp)$/) || !imageDto.name.match(/\.(jpg|jpeg|png|webp)$/)) {
          // ERROR
          ErrorManager.createSignatureError(
            `UNSUPPORTED_MEDIA_TYPE :: Tipo de archivo no soportado para ${imageDto.name}.`,
          );
        }

        // ACUMULAR EL TAMAÑO TOTAL PARA LA SIGUIENTE VALIDACION
        totalSize += imageDto.size;
        
      // LIMPIEZA DEL BASE64
      const base64Content = imageDto.dataUrl.split(';base64,').pop() as string;
        
      // 2. FORZAR ERROR Y SALIDA INMEDIATA
      if (!base64Content) {
        ErrorManager.createSignatureError(
            `BAD_REQUEST :: El campo dataUrl no contiene el prefijo de Base64 esperado.`,
        );
      }

      const imageBuffer = Buffer.from(base64Content, 'base64')

      // CREACION DE LA ENTIDAD EXPERIENCE
      const newExperience = repo.create({
        ...imageDto,
        tasker: { idTasker },
        imageBase64: imageBuffer, // ASIGNAR EL LIMPIO
      });
        
        // RETORNAR PROMESA DE GUARDADO
        return repo.save(newExperience);

      });

      // SI EL TAMAÑO TOTAL ES MAYOR A AL VALOR MAXIMO TOTAL DE BYTES
      if (totalSize > MAX_TOTAL_SIZE_BYTES) {
        ErrorManager.createSignatureError(
          `PAYLOAD_TOO_LARGE :: El tamaño total para todas las imagenes excede el límite permitido de ${MAX_TOTAL_SIZE_BYTES / (1024 * 1024)}MB.`,
        );
      }

      // EJECUTAR TODAS LAS PROMESAS DE GUARDADO
      const savedExperiences = await Promise.all(savePromises);

      return savedExperiences;
    } catch (error) {
      const err = error as HttpException;
      this.logger.error(err.message, err.stack);

      if (err instanceof ErrorManager) throw err;

      throw ErrorManager.createSignatureError(err.message);
    }
  }

  findAll() {
    return `This action returns all experiences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
