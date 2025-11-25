import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { ErrorManager } from 'src/config/ErrorMannager';
import { DeleteResult } from 'typeorm/browser';
import { FindOneByTokenDto } from './dto/findByToken.dto';

@Injectable()
export class RefreshTokenService {
  private readonly logger:Logger = new Logger(RefreshTokenService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  // CREAR Y GUARDA UN NUEVO REFRESH TOKEN
  async create(createRefreshTokenDto:CreateRefreshTokenDto): Promise<RefreshToken> {
    const { token, expiresAt, user, ip, userAgent } = createRefreshTokenDto;
    try {
      const refresh = this.refreshTokenRepository.create({
      token,
      user,
      expiresAt,
      ip: ip,
      userAgent: userAgent,
    });

    this.logger.debug(refresh)

    return this.refreshTokenRepository.save(refresh);
      
    } catch (error) {
      const err = error as HttpException;
      if (err instanceof ErrorManager) throw err;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  // BUSCAR POR EL REFRESH TOKEN
  async findByToken(tokenDto: FindOneByTokenDto):Promise<RefreshToken | null> {
    const { token } = tokenDto;
    try {
      const findRefreshToken: RefreshToken | null = await this.refreshTokenRepository.findOne({
        where: { token },
        relations: ['user'],
      });

      // SI NO SE ENCONTRO EL TOKEN 
      if(!findRefreshToken){
        throw ErrorManager.createSignatureError('BAD_REQUEST:: No se encontró un token asociado al usuario')
      }

      return findRefreshToken;
    } catch (error) {
      const err = error as HttpException;
      if (err instanceof ErrorManager) throw err;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  // BORRAR UN REFRESH TOKEN (LOGOUT POR DISPOSITIVO)
  async revokeByToken(tokenDto: FindOneByTokenDto):Promise<DeleteResult> {
    const { token } = tokenDto;
    try {
      const deleteToken: DeleteResult = await this.refreshTokenRepository.delete({ token });

      // SI NO HUBO AFECTADOS
      if(deleteToken.affected === 0){
        throw ErrorManager.createSignatureError('BAD_REQUEST :: No se encontró token para revocar')
      }

      return deleteToken;
    } catch (error) {
      const err = error as HttpException;
      if (err instanceof ErrorManager) throw err;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  //REVOCA TODOS LOS TOKENS DE UN USUARIO
  /*
    - PROPOSITO: REVOCAR TODOS LOS REFRESH TOKENS DE UN USUARIO ESPECIFICO

    - COMO FUNCIONA: HACE UN  DELETE EN LA TABLA DE  refresh_tokens DONDE LA COLUMNA user.idUser COINCIDA CON idUser.

    - EJEMPLO DE USO: CUANDO UN USUARIO HAGA LOGOUT EN TODOS LOS DISPOSITIVOS O CAMBIA LA CONTRASEÑA Y SE QUIERA IVALIDAR TODOS SUS TOKENS.
  
     NOTA: NO IMPORTA SI LOS TOKENS ESTAN EXPIRADOS O NO, SE ELIMINARAN PARA ESE USUARIO
  */ 
  async revokeAllByUser(idUser: string): Promise<DeleteResult>{
    try {
      const deleteToken: DeleteResult = await this.refreshTokenRepository.delete({ user: { idUser } });

      // SI NO HUBO AFECTADOS
      if(deleteToken.affected === 0){
        throw ErrorManager.createSignatureError('BAD_REQUEST :: No se encontró usuario asociado a los registros de tokens')
      }

      return deleteToken;
    } catch (error) {
      const err = error as HttpException;
      if (err instanceof ErrorManager) throw err;
      throw ErrorManager.createSignatureError(err.message);
    }
  }

  // LIMPIAR TOKENS EXPIRADOS (USAR EN JOB/Cron)
  /*
    -PROPOSITO: LIMPIAR TOKENS QUE YA EXPIRARON, SIN IMPORTAR A QUIEN PEERTENEZCA

    -COMO FUNCIONA: USANDO QueryBuilder, BORRA TODOS LOS REGISTROS DONDE LA FECHA DE expries_at SEA MENOR O IGUAL A LA FECHA ACTUAL.

    -EJEMPLO DE USO: ESTO SE PUEDE EJECUTAR DE FORMA AUTOMATICA CON UN JOB O CRON PARA MANTENER LA TABLA LIMPIA Y NO SATURARLA CON TOKENS INVALIDOS.

    NO DEBERIA AFECTAR A TOKENS VALIDOS  
  */
  async removeExpired() {
    try {
      const now:Date = new Date(); //TIEMPO ACTUAL
      return this.refreshTokenRepository.createQueryBuilder()
        .delete() //BORRAR TODO
        .from(RefreshToken) //DE LA ENTIDAD "RefreshTokens"
        .where('expires_at <= :now', { now }) //DONDE SE CUMPLA CON EL CRITERIO EN QUE EL TIEMPO ACTUAL SEA MENOR O IGUAL AL DE EXPIRACION, ES DECIR YA PASO
        .execute(); //EJECUTA EL DELETE
      } catch (error) {
        const err = error as HttpException;
        if (err instanceof ErrorManager) throw err;
        throw ErrorManager.createSignatureError(err.message);
      }
  }
}
