import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ERoles } from 'src/types/enums/enumRoles';
import { ErrorManager } from 'src/config/ErrorMannager';

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger(RoleService.name);
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  // METODO PARA BUSCAR O CREAR
  async findOrCreate(role: ERoles, manager?:EntityManager): Promise<Role[]> {
    try {
      const repo: Repository<Role> = manager ? manager.getRepository(Role) : this.roleRepository;
      // BUSCAR O CREAR EL ROL DEL USUARIO
      // PRIMERO INTENTO BUSCAR EL ROL EXISTENTE
      let roleEntity: Role | null = await repo.findOne({
        where: { nameRole: role},
      });

      this.logger.debug(roleEntity);

      // SI NO ENCUENTRA
      if (!roleEntity) {
        // SI NO EXISTE EL ROL, LO CREO NUEVO
        roleEntity = this.roleRepository.create({ nameRole: role }); //DEVUELVE UN OBJETO SIN ID NI DATOS GENERADOS.

        this.logger.debug(roleEntity.nameRole);
        this.logger.debug(roleEntity.users);

        // VALIDAR QUE EL ROL SEA UNO PERMITIDO
        // NO PERMITO QUE UN USUARIO SE CREE CON ROLES RESERVADOS EJEMPLO "ADMIN"
        if (!Object.values(ERoles).includes(roleEntity.nameRole)) {
          ErrorManager.createSignatureError(`FORBIDDEN :: El role elegido no está permitido.`);
        }

        // GUARDO EL NUEVO ROL EN LA BASE DE DATOS
        roleEntity = await repo.save(roleEntity); // LISTO PARA USAR EN RELACIONES O RESPUESTAS
      }

      return [roleEntity];
    } catch (error) {
      const err = error as HttpException;
      this.logger.error(err.message, err.stack); // LOG PARA DEPURACION
      if(err instanceof ErrorManager) throw err;

      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
