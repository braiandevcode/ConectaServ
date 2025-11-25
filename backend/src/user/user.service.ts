import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ErrorManager } from 'src/config/ErrorMannager';
import { Role } from 'src/role/entities/role.entity';
import { Location } from 'src/location/entities/location.entity';
import { instanceToPlain } from 'class-transformer';
import { TaskersService } from 'src/tasker/taskers.service';
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
    private readonly dataSource: DataSource,
  ) {}

  // REGISTRAR
  async create(
    fileProfile: Express.Multer.File | null,
    filesExp: Express.Multer.File[],
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
      ...restOfUserDto
    } = createUserDto;

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // ==> CONEXION
    await queryRunner.startTransaction(); // ==> INICIO DE LA TRANSACCIÓN

    try {
      // VERIFICAR SI EL USUARIO YA EXISTE Y SI EL ACTIVE ESTA EN TRUE
      // BUSCO EN LA TABLA DE USUARIOS POR EMAIL
      const existingUser: User | null = await queryRunner.manager.findOne(
        User,
        {
          where: [
            { email: email }, // EXISTE UN USUARIO CON ESTE EMAIL
            { userName: userName }, // O EXISTE UN USUARIO CON ESTE USERNAME
          ],
        },
      );

      this.logger.debug(existingUser);

      // SI EMAIL YA EXISTE
      if (existingUser) {
        // SI YA EXISTE, LANZO UN ERROR CONTROLADO
        // ESTO AYUDA A QUE EL FRONTEND PUEDA SABER QUE YA ESTA REGISTRADO  ==> CODIGO 409
        ErrorManager.createSignatureError(
          `CONFLICT :: El usuario o email ya está registrado.`,
        );
      }

      // LLAMO AL SERVICIO QUE HACE LA CREACION Y VALIDACION EN SU MODULO PARA SU ENTIDAD
      const locationEntity: Location = await this.locationService.findOrCreate(
        locationData,
        queryRunner.manager,
      );

      const roleEntity: Role[] = await this.roleService.findOrCreate(
        roleData.role,
        queryRunner.manager,
      );

      const hashedPassword: string = await hash(password);

      // CREAR LA ENTIDAD USUARIO
      // AQUI ARMAMOS EL OBJETO USER CON TODOS LOS DATOS DEL FRONTEND
      // INCLUIMOS LA LOCALIDAD Y EL ROL QUE ACABAMOS DE OBTENER
      const user: User = queryRunner.manager.create(User, {
        ...restOfUserDto,
        userName,
        email,
        password: hashedPassword, //==> HASHEAR CONTRASEÑA
        locationData: locationEntity,
        rolesData: roleEntity, // ASIGNO UN ARRAY CON EL ROL
      });

      // GUARDAR EL USUARIO EN LA BASE DE DATOS
      // TYPEORM AUTOMATICAMENTE GUARDA LA RELACION EN LA TABLA INTERMEDIA
      const savedUser: User = await queryRunner.manager.save(user);

      //PREGUNTO QUE ROL VIENE, PARA SABER SI DEBE CONTINUAR CON MAS DATOS QUE SE AGREGARIAN EN TASKERS Y SUS RELACIONES
      // O SIMPLEMENTE SON LOS DATOS BASICOS DE UN CLIENTE
      this.logger.debug(savedUser);
      this.logger.debug(fileProfile);
      this.logger.debug(filesExp);

      let tasker: Tasker | null = null;
      if (roleData.role === 'tasker' && taskerData) {
        this.logger.debug(tasker);
        this.logger.debug(taskerData);

        tasker = await this.taskerService.create(
          fileProfile,
          filesExp,
          taskerData,
          queryRunner.manager,
        );

        savedUser.taskerData = tasker; // ASIGNAR EL TASKER COMPLETO A LA RLACION

        // DECIRLE A TYPEORM QUE ACTUALIZE LA FK id_tasker EN USER
        await queryRunner.manager.save(savedUser);
      }

      // SI E ROL ES TASKER PERO NO VIENEN DATOS NO CONTINUAR
      if (roleData.role === 'tasker' && !taskerData) {
        ErrorManager.createSignatureError(
          'INTERNAL_SERVER_ERROR :: El usuario fue registrado con rol "tasker" pero la entidad Tasker no se asoció correctamente.',
        );
        await queryRunner.rollbackTransaction(); // ROLLBACK: SI ALGO FALLA DESHACE  ==> User y Tasker.
      }

      await queryRunner.commitTransaction(); // COMMIT ==> SI TODO FUNCIONO GUARDAR.

      const userPlain = instanceToPlain(savedUser);

      this.logger.debug(userPlain);

      // DEVOLVEMOS EL RESULTADO
      return userPlain;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // ROLLBACK: SI ALGO FALLA DESHACE  ==> User y Tasker.
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as HttpException;
      this.logger.error(err.message, err.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;
      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
    } finally {
      await queryRunner.release(); // CIERRA EL => QueryRunner
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  // BUSCAR SOLO EL EMAIL EN LA TABLA USERS
  async getUserEmail({ email }: { email: string }): Promise<User | null> {
    try {
      // CONSULTA
      const resultQuery: User | null = await this.userRepository.findOne({
        where: { email },
        select: ['email'], //BUSCAR SOLO EN LA COLUMNA EMAIL
      });

      return resultQuery;
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

  // BUSCAR SOLO EL USUARIO EN LA TABLA USERS DE USUARIOS ACTIVOS
  async findByUserNameActiveForAuth({ userName }: { userName: string }): Promise<User | null> {
    try {
      // CONSULTA
      const resultQuery: User | null = await this.userRepository.findOne({
        where: [
          { email: userName, active: true },
          { userName: userName, active: true },
        ],
        relations:['rolesData'],
        select: ['idUser', 'email', 'userName', 'password', 'rolesData', 'active'],
      });

      // SI ES NULL RETORNAR NULO LIBRERIA PASSPORT MANEJA ESE CASO
      if (!resultQuery) {
        return null;
      }

      return resultQuery;
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
