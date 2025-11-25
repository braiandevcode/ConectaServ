import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { iJwtPayload } from './interface/jwtPayload';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-tokens.service';
import { ErrorManager } from 'src/config/ErrorMannager';
import { LoginDto } from './dto/login-dto';
import argon2 from 'argon2';
import { User } from 'src/user/entities/user.entity';
import { RefreshToken } from 'src/refresh-tokens/entities/refresh-token.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userService: UserService,
  ) {}

  // VALIDAR CREDENCIALES MEDIANTE PASSPORT
  async validateUser(loginDto: LoginDto): Promise<iJwtPayload | null> {
    const { userName, password } = loginDto;

    // BUSCAR EL USUARIO ACTIVO POR USERNAME O EMAIL
    const user: User | null = await this.userService.findByUserNameActiveForAuth({ userName });

    // SI NO EXISTE EL USUARIO, RETORNAR NULL PARA QUE PASSPORT MANEJE EL 401
    if (!user) return null;

    // OBTENER LA CONTRASEÑA HASHEADA DEL USUARIO
    const hashedPassword: string = user.password;

    // VERIFICAR CONTRASEÑA CON ARGON2
    const isMatch: boolean = await argon2.verify(hashedPassword, password);

    // SI LA CONTRASEÑA NO COINCIDE, RETORNAR NULL
    if (!isMatch) return null;

    // CONSTRUIR EL PAYLOAD LIMPIO PARA EL JWT
    const payload: iJwtPayload = {
      sub: user.idUser, // ID DEL USUARIO
      userName: user.userName, // NOMBRE DE USUARIO
      email: user.email, // EMAIL (OPCIONAL)
      roles: user.rolesData.map((role) => role.nameRole), // ARRAY DE NOMBRES DE ROLES
    };

    // RETORNAR EL PAYLOAD LIMPIO
    return payload;
  }

  // SIGN IN: GENERA ACCESS + REFRESH Y GUARDA EL REFRESH EN DB
  async signIn(userPayload: iJwtPayload, ip?: string, userAgent?: string) {
    try {

      this.logger.debug(JSON.stringify(userPayload));

      // GENERAR ACCESS TOKEN
      const accessToken: string = this.jwtService.sign(userPayload, { expiresIn: '15m' });
      this.logger.debug(accessToken);

      // CONFIGURAR REFRESH TOKEN
      /*
        - JWT_SECRET_REFRESH  ==> LLAVE SECRETA DISTINTA QUE FIRMARA LOS REFRESH TOKENS. ASI SI ALGUIEN ROBA UN ACCESS TOKEN, NO PUEDE USARLO PARA CREAR REFRESH TOKENS.

        - JWT_EXPIRES_REFRESH ==>  TIEMPO DE EXPIRACION PARA LOS REFRESH TOKENS. NORMALMENTE ES MAS LARGO QUE EL ACCESS TOKEN, POR EJEMPLO 7 DÍAS (7D).
      */

      // LEEMOS VARIABLES PARA GENERAR EL TOKEN
      const refreshSecret: string = this.configService.getOrThrow<string>('JWT_SECRET_REFRESH');
      const refreshExpires: string = this.configService.getOrThrow<string>('JWT_EXPIRES_REFRESH');

      this.logger.debug(refreshSecret);
      this.logger.debug(refreshExpires);

      const payload: {sub:string} = { sub: userPayload.sub }; 

      this.logger.debug(payload)
      // GENERAR REFRESH TOKEN COMO JWT
      const refreshTokenJwt: string = this.jwtService.sign(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpires,
      } as JwtSignOptions);

      // CALCULAR FECHA DE EXPIRACION PARA DB
      const expiresAt: Date = new Date();
      this.logger.debug(expiresAt);

      // SETEAR EN EXPIRES AT EL MOMENTO ACTUAL + 7 (DONDE SE ASIGNA TERNARIO Y SI DAYS NO ES UN NUMERO SERA 7 SINO DAYS)
      expiresAt.setDate(expiresAt.getDate() + 7);

      // OBTENER ENTIDAD USER
      const user: User | null = await this.userService.findByUserNameActiveForAuth({ userName: userPayload.userName });

      this.logger.debug(user);

      if (!user)
        throw ErrorManager.createSignatureError('NOT_FOUND :: Usuario no encontrado');

      // GUARDAR REFRESH TOKEN EN DB
      await this.refreshTokenService.create({
        token: refreshTokenJwt,
        user,
        expiresAt,
        ip,
        userAgent,
      });

      return { accessToken, refreshToken: refreshTokenJwt };
    } catch (error) {
      const err = error as HttpException;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  // VALIDAR REFRESH: RECIBE EL TOKEN STRING, BUSCA EN DB Y RETORNA NUEVO ACCESS TOKEN
  async refreshAccessToken(refreshToken: string):Promise<{accessToken: string } | null> {
    try {

        this.logger.debug(refreshToken);

      // BUSCAR EN DB
      const record: RefreshToken | null = await this.refreshTokenService.findByToken({ token: refreshToken,});

      this.logger.debug(record);

      if (!record) return null;

      this.logger.debug(record.expiresAt);
      this.logger.debug(new Date());
      
      // VALIDAR EXPIRACION
      // SI YA EXPIRO ELIMINAR
      if (record.expiresAt <= new Date()) {
        await this.refreshTokenService.revokeByToken({ token: refreshToken });
        return null;
      }

      // VERIFICAR FIRMA JWT DEL REFRESH
      const refreshSecret:string= this.configService.getOrThrow<string>('JWT_SECRET_REFRESH');

      this.logger.debug(refreshSecret);
      try {
        // VERIFICAR EL TOKEN QUE VIENE POR EL TOKEN GUARDADO
        this.jwtService.verify(refreshToken, { secret: refreshSecret });
      } catch (err) {
        // SINO REVOCAR
        await this.refreshTokenService.revokeByToken({ token: refreshToken });
        return null;
      }

      // CREAR NUEVO ACCESS TOKEN
      const user:User = record.user;
      // NUEVO PAYLOAD
      const payload: iJwtPayload = {
        sub: user.idUser,
        userName: user.userName,
        email: user.email,
        roles: user.rolesData.map((r) => r.nameRole),
      };
      // AGREGAMOS NUEVO PAYLOAD A JWT Y LO ALMACENO EN CONSTANTE
      const accessToken:string= this.jwtService.sign(payload);

      return { accessToken }; //RETORNAR OBJETO CON NUEVO ACCES TOKEN 
    } catch (error) {
      const err = error as HttpException;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  // LOGOUT: BORRAR UN REFRESH TOKEN (RECIBIDO DESDE FRONT)
  async logout(refreshToken: string):Promise<{revoked: boolean}> {
    try {
      await this.refreshTokenService.revokeByToken({ token: refreshToken });
      return { revoked: true };
    } catch (error) {
      const err = error as HttpException;
      throw ErrorManager.createSignatureError(err.message);
    }
  }
}
