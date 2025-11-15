import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { Hour } from './entities/hour.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { EntityCreatorService } from 'src/shared/entityCreator.service';
import { VALID_HOURS } from 'src/types/enums/enum.utils';
import { ErrorManager } from 'src/config/ErrorMannager';

@Injectable()
export class HourService {
  private readonly logger: Logger = new Logger(HourService.name);
  constructor(
    @InjectRepository(Hour) private readonly hourRepository: Repository<Hour>,
    private readonly entityCreatorService: EntityCreatorService,
  ) {}

  create(createHourDto: CreateHourDto) {
    return 'This action adds a new hour';
  }

  // BUSCAR O CREAR
  async findeOrCreate(hours: string[], manager?:EntityManager): Promise<Hour[]> {
    try {
      // AQUI SE DEFINE CUAL Repository/Manager USAR
      const repo: Repository<Hour> = manager ? manager.getRepository(Hour) : this.hourRepository;

      // SERVICIO UTILS QUE YA VALIDA INTERNAMENTE
      return await this.entityCreatorService.findOrCreateEntitiesByNames({
        keyNames: hours,
        keyName: 'hourName',
        repo,
        validValues: VALID_HOURS,
      });
    } catch (error) {
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as HttpException;
      this.logger.error(err.message, err.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;

      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  findAll() {
    return `This action returns all hour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hour`;
  }

  update(id: number, updateHourDto: UpdateHourDto) {
    return `This action updates a #${id} hour`;
  }

  remove(id: number) {
    return `This action removes a #${id} hour`;
  }
}
