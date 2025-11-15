import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/ErrorMannager';
import { Role } from 'src/role/entities/role.entity';
import { Location } from 'src/location/entities/location.entity';
import { instanceToPlain } from 'class-transformer';
import { TaskersService } from 'src/tasker/taskers.service';
// import { CreateUserWithTaskerDto } from './dto/create-user-with-tasker';
import { Tasker } from 'src/tasker/entities/tasker.entity';
import { hash } from 'argon2';
import { LocationsService } from 'src/location/locations.service';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryRunner } from 'typeorm/browser';

@Injectable()
export class UserService {
  // INJECCION DEL REPOSITORIO => BUENA PRACTICA PARA LOGS
  private readonly logger: Logger = new Logger(UserService.name);

  // LO PRIMERO QUE SIEMPRE SE EJECUTARA
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // REPOSITORIO DE USUARIOS
    private readonly taskerService: TaskersService, //SERVICIO TASKER
    private readonly locationService: LocationsService, //SERVICIO LOCATIONS
    private readonly roleService: RoleService, //SERVICIO ROLES
    private readonly dataSource:DataSource,
  ) {}

  // REGISTRAR
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Record<string, Omit<User, 'password'>>> {
    // DESESTRUCTURO LOS DATOS QUE LLEGAN DEL FRONTEND
    const {
      email,
      userName,
      locationData,
      roleData,
      taskerData,
      password,
    } = createUserDto;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // ==> CONEXION
    await queryRunner.startTransaction(); // ==> INICIO DE LA TRANSACCIÓN

    try {
      // VERIFICAR SI EL USUARIO YA EXISTE
      // BUSCO EN LA TABLA DE USUARIOS POR EMAIL
      const existingUser: User | null = await queryRunner.manager.findOne(User,{
        where: [
          { email: email }, // EXISTE UN USUARIO CON ESTE EMAIL
          { userName: userName }, // O EXISTE UN USUARIO CON ESTE USERNAME
        ],
      });

      this.logger.debug(existingUser);

      // SI EMAIL YA EXISTE
      if (existingUser) {
        // SI YA EXISTE, LANZO UN ERROR CONTROLADO
        // ESTO AYUDA A QUE EL FRONTEND PUEDA SABER QUE YA ESTA REGISTRADO  ==> CODIGO 409
        ErrorManager.createSignatureError(`CONFLICT :: El usuario o email ya está registrado.`);
      }

      // LLAMO AL SERVICIO QUE HACE LA CREACION Y VALIDACION EN SU MODULO PARA SU ENTIDAD
      const locationEntity: Location = await this.locationService.findOrCreate(locationData, queryRunner.manager);

      const roleEntity: Role[] = await this.roleService.findOrCreate(roleData.role, queryRunner.manager);

      const hashedPassword: string = await hash(password);

      // CREAR LA ENTIDAD USUARIO
      // AQUI ARMAMOS EL OBJETO USER CON TODOS LOS DATOS DEL FRONTEND
      // INCLUIMOS LA LOCALIDAD Y EL ROL QUE ACABAMOS DE OBTENER
      const user: User = queryRunner.manager.create(User, {
        ...createUserDto, // AGREGO LOS CAMPOS COMO fullName, userName, email, password, isVerified
        password: hashedPassword, //==> HASHEAR CONTRASEÑA
        cityName:locationEntity,
        roles: roleEntity, // ASIGNO UN ARRAY CON EL ROL
      });

      // GUARDAR EL USUARIO EN LA BASE DE DATOS
      // TYPEORM AUTOMATICAMENTE GUARDA LA RELACION EN LA TABLA INTERMEDIA
      const savedUser: User = await queryRunner.manager.save(user);

      //PREGUNTO QUE ROL VIENE, PARA SABER SI DEBE CONTINUAR CON MAS DATOS QUE SE AGREGARIAN EN TASKERS Y SUS RELACIONES
      // O SIMPLEMENTE SON LOS DATOS BASICOS DE UN CLIENTE
      this.logger.debug(savedUser);

      let tasker: Tasker | null = null;
      if (roleData.role === 'tasker' && taskerData) {
        this.logger.debug(tasker);
        this.logger.debug(taskerData);
        tasker = await this.taskerService.create(taskerData, queryRunner.manager);
      }

      await queryRunner.commitTransaction(); // COMMIT ==> SI TODO FUNCIONO GUARDAR.

      // CONVERTIMOS A OBJETOS PLANOS (APLICA EXCLUDE Y EXPOSE AUTOMATICAMENTE EN DTO)
      const taskerUser:Tasker| null = tasker ? tasker : null;
      const userPlain = instanceToPlain({...savedUser, idTasker: tasker?.idTasker, ...taskerUser } as User | User & Tasker
    );

      this.logger.debug(userPlain);

      // DEVOLVEMOS EL RESULTADO
      return userPlain;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 5. ROLLBACK: SI ALGO FALLA DESHACE  ==> User y Tasker.
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as HttpException;
      this.logger.error(err.message, err.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;
      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
    }finally{
      await queryRunner.release(); // CIERRA EL => QueryRunner
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
