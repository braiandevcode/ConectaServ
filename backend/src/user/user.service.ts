import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/config/ErrorMannager';
import { Role } from 'src/role/entities/role.entity';
import { Location } from 'src/location/entities/location.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  // INJECCION DEL REPOSITORIO => BUENA PRACTICA PARA LOGS
  private readonly logger: Logger = new Logger(UserService.name);

  // LO PRIMERO QUE SIEMPRE SE EJECUTARA
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // REPOSITORIO DE USUARIOS
    @InjectRepository(Location)private readonly locationRepository: Repository<Location>, // REPOSITORIO DE LOCALIDADES
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>, // REPOSITORIO DE ROLES
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Record<string, Omit<User, 'password'>>> {
    // DESESTRUCTURO LOS DATOS QUE LLEGAN DEL FRONTEND
    const { email, city: cityName, role } = createUserDto;

    // TRY
    try {
      // VALIDAR CAMPOS REQUERIDOS ANTES DE CONTINUAR
      // SI ALGUNO DE LOS CAMPOS NECESARIOS NO ESTA PRESENTE, LANZO ERROR 400
      if (!email || !cityName || !role) {
        throw new ErrorManager({
          message: 'Faltan datos obligatorios para crear el usuario.',
          type: 'BAD_REQUEST', // ERROR 400
        });
      }

      // VERIFICAR SI EL USUARIO YA EXISTE
      // BUSCO EN LA TABLA DE USUARIOS POR EMAIL
      const existingUser: User | null = await this.userRepository.findOneBy({ email } );

      // SI EMAIL YA EXISTE
      if (existingUser) {
        // SI YA EXISTE, LANZO UN ERROR CONTROLADO
        // ESTO AYUDA A QUE EL FRONTEND PUEDA SABER QUE YA ESTA REGISTRADO
        throw new ErrorManager({
          message: `El email ${email} ya está registrado.`,
          type: 'CONFLICT', // ERROR 409
        });
      }

      // VALIDAR QUE EL ROL SEA UNO PERMITIDO
      // NO PERMITO QUE UN USUARIO SE CREE CON ROLES RESERVADOS COMO "ADMIN"
      if (!['client', 'tasker'].includes(role)) {
        throw new ErrorManager({
          message: `El rol '${role}' no está permitido.`,
          type: 'FORBIDDEN', // ERROR 403
        });
      }

      // BUSCAR O CREAR LA LOCALIDAD SELECCIONADA
      // PRIMERO INTENTO BUSCAR LA LOCALIDAD EXISTENTE
      let locationEntity: Location | null =
        await this.locationRepository.findOne({
          where: { city: cityName },
        });

      // SI NO LA ENCUENTRA
      if (!locationEntity) {
        // SI NO EXISTE LA LOCALIDAD, LA CREO NUEVA
        // CREO LA INSTANCIA DE LA ENTIDAD CON EL NOMBRE DE LA CIUDAD
        locationEntity = this.locationRepository.create({ city: cityName });

        // GUARDO LA NUEVA LOCALIDAD EN LA BASE DE DATOS
        locationEntity = await this.locationRepository.save(locationEntity);
      }

      // BUSCAR O CREAR EL ROL DEL USUARIO
      // PRIMERO INTENTO BUSCAR EL ROL EXISTENTE
      let roleEntity: Role | null = await this.roleRepository.findOne({
        where: { nameRole: role },
      });

      // SI NO ENCUENTRA
      if (!roleEntity) {
        // SI NO EXISTE EL ROL, LO CREO NUEVO
        roleEntity = this.roleRepository.create({ nameRole: role });

        // GUARDO EL NUEVO ROL EN LA BASE DE DATOS
        roleEntity = await this.roleRepository.save(roleEntity);
      }

      // ACA PREGUNTAR NUEVAMENTE EL ROL QUE VIENE, PARA SABER SI DEBE CONTINUAR CON MAS DATOS QUE SE AGREGARIAN EN TASKERS Y SUS RELACIONES
      // O SIMPLEMENTE SON LOS DATOS BASICOS DE UN CLIENTE
      if (role === 'tasker') {
        // AQUI LLAMARIA A TaskersService.createTaskerData()
        // PERO AUN NO LO IMPLEMENTASTE
      }

      // CREAR LA ENTIDAD USUARIO
      // AQUI ARMAMOS EL OBJETO USER CON TODOS LOS DATOS DEL FRONTEND
      // INCLUIMOS LA LOCALIDAD Y EL ROL QUE ACABAMOS DE OBTENER
      const user: User = this.userRepository.create({
        ...createUserDto, // AGREGO LOS CAMPOS COMO fullName, userName, email, password, isVerified
        city: locationEntity, // ASIGNO LA ENTIDAD LOCATION
        roles: [roleEntity], // ASIGNO UN ARRAY CON EL ROL
      });

      // GUARDAR EL USUARIO EN LA BASE DE DATOS
      // TYPEORM AUTOMATICAMENTE GUARDA LA RELACION EN LA TABLA INTERMEDIA
      const savedUser: User = await this.userRepository.save(user);

      // DEVOLVER EL USUARIO CREADO
      return instanceToPlain(savedUser);
    } catch (error) {
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as Error;
      this.logger.error(err.message, err.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;

      // SI NO, CREO UN ERROR 500 GENÉRICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err.message);
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
