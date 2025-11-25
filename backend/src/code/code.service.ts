import { HttpException, Injectable, Logger } from '@nestjs/common';
// import { UpdateCodeDto } from './dto/update-code.dto';
import { TVerifyCode } from 'src/types/typeSendVerifyCode';
import { ErrorManager } from 'src/config/ErrorMannager';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RequestCodeDto } from './dto/request-code-dto';
import { iPayloadTokenVerifyEmail } from 'src/code/interface/iPyloadTokenVerifyEmail';
import { ETokenType } from 'src/types/enums/enumTokenType';
import { iSendResendEmail } from 'src/code/interface/iSendResendEmail';
import { VerifyCodeDto } from './dto/verify-code-dto';
import { EStatusVerifyEmail } from 'src/types/enums/enumStatusVerifyEmail';
import { iMessageResponseStatus } from 'src/code/interface/iMessagesResponseStatus';
import { iMessageStausToken } from 'src/code/interface/iMessageStatusToken';
import { ConfigResendService } from 'src/configResend/config-resend.service';
import { CreateEmailResponse, Resend } from 'resend';

@Injectable()
export class CodeService {
  private readonly logger: Logger = new Logger(CodeService.name);
  private readonly resend: Resend;

  constructor(
    @InjectRepository(Code) private readonly codeRepository: Repository<Code>,
    private readonly jwtService: JwtService,
    private readonly emailCredentialsService: ConfigResendService,
    private readonly userService: UserService,
  ) {
    // INICIALIZAR EL CLIENTE RESEND CON LA API KEY
    const { apiKey } = this.emailCredentialsService.getClientInit();
    this.resend = new Resend(apiKey); //INSTANCIA DE RESEND
  }

  //METODO PRIVADO QUE RETORNA OBJETO DE CONFIGURACION PARA ENVIO DEL TEMPLATE AL EMAIL DEL USUARIO
  private templateParamsEmailjs = ({ to_email, verification_code }: TVerifyCode): TVerifyCode => ({
    to_email, // ==> CORREO DE DESTINO
    verification_code, //==> CODIGO GENERADO A LA PLANTILLA
  });

  // METODO PRIVADO PARA GENERAR EL RANDOM
  private generateRandomNumber() {
    // GENERAR UN NUMERO ALEATORIO ENTRE 100000 y 999999
    // PISO DE 100000
    // DEL RANGO DESDE 0 A CASI 1(EXCLUIDO) MULTIMPLICADO POR 900000 ==> Y SUMANDO 100000(DESPLAZAMIENTO PARA EL INICIO)
    // FLOOR REDONDEA HACIA EL "PISO" NUMERO MAS PEQUEÑO ==> CON ROUND() PODRIA OBTENER 1.000.000 LO CUAL GENERARIA UN DIGITO MAS
    return Math.floor(100000 + Math.random() * 900000);
  }

  // METODO PRIVADO PARA GENERAR EL TOKEN JWT DE VERIFICACION
  private generateVerificationToken(email: string): string {
    const payload: iPayloadTokenVerifyEmail = {
      email: email,
      type: ETokenType.EMAIL_VERIFY,
    };
    return this.jwtService.sign(payload);
  }

  // ENVIO DE CODIGO MEDIANTE SERVICIO RESEND
  private async sendEmailService({ email, code }: iSendResendEmail): Promise<CreateEmailResponse> {
    try {
      // USO METODO CONFIGURATIVO
      const templateParams: TVerifyCode = this.templateParamsEmailjs({
        to_email: email,
        verification_code: code.toString(),
      });

      // HTML SIMPLE PARA EL EMAIL USANDO LOS PARAMS DE LA "PLANTILLA" 
      const html:string = `<p>TU CÓDIGO ES: <strong>${templateParams.verification_code}</strong></p>`;

      // ENVIO Y RESPUESTA DEL SERVICIO RESEND
      const responseService:CreateEmailResponse = await this.resend.emails.send({
        from: 'ConectaServ <onboarding@resend.dev>', // SOLO PARA DESARROLLO DEJA ENVIAR A PROPIO EMAIL. CAMBIAR EN PRODUCCIÓN
        to: email, //EN DESARROLLO SOLO A EMAIL DE CUENTA RESEND
        subject: 'Código de verificación',
        html,
      });

      // VALIDAR RESPUESTA BASICA (RESEND DEVUELVE UN OBJETO CON ID SI SE ENVIO CORRECTAMENTE)
      if (!responseService || !responseService.data || !responseService.data.id) {
        // LOG Y RETORNO
        this.logger.debug(responseService);
        throw ErrorManager.createSignatureError(`INTERNAL_SERVER_ERROR :: El servicio no pudo concretar el envio, por un problema desconocido`);
      }

      // LOG Y RETORNO (MANTENGO USO DE LOGGER COMO EN TU ORIGINAL)
      this.logger.debug(responseService);
      return responseService;
    } catch (error) {
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as HttpException;
      this.logger.error(err?.message ?? String(error), (err as any)?.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;
      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err?.message ?? 'Error desconocido al enviar email');
    }
  }

  //CREAR Y GUARDAR EL DATO EN DB
  async requestCode(requestCodeDto: RequestCodeDto): Promise<iMessageStausToken> {
    const { email } = requestCodeDto;
    let generateCode: number; // AUX PARA NUMERO DE CODIGO GENERADO
    let verificationToken: string; // AUX PARA EL TOKEN GENERADO

    this.logger.debug(email);
    try {
      // LLAMAR AL SERVICIO PARA QUE HAGA LA CONSULTA A LA TABLA USUARIOS Y FILTRE EL EMAIL QUE SE LE PASA
      const resultUserService: any = await this.userService.getUserEmail({ email });

      this.logger.debug(resultUserService);

      // SI YA EXISTE CONFLICTO
      if (resultUserService) {
        this.logger.debug(resultUserService);
        // USAMOS EL MANEJADOR DE ERRORES YA DEFINIDO POR TI
        throw ErrorManager.createSignatureError(`CONFLICT :: El email ya está registrado, intenta con otro`);
      }

      // SI NO EXISTE, PROCEDEMOS A GENERAR Y ALMACENAR
      // GENERAR CODIGO Y TOKEN
      generateCode = this.generateRandomNumber(); // GENERAR NUMERO ALEATORIO
      verificationToken = this.generateVerificationToken(email); // GENERAR EL TOKEN JWT

      // CALCULAR EXPIRACION
      const expirationTime: Date = new Date();

      this.logger.debug('ANTES', expirationTime);

      // 5 MINUTOS DE EXPIRACIÓN EL MISMO TIEMPO QUE TIENE JWT
      expirationTime.setMinutes(expirationTime.getMinutes() + 5);

      this.logger.debug('SUMADO A 5M', expirationTime);

      const newValues = {
        code: generateCode.toString(), // CONVERSIÓN A STRING
        status: EStatusVerifyEmail.PENDING, // ESTADO INICIAL
        expiresAt: expirationTime, // SE GUARDA EL TIEMPO DE EXPIRACIÓN
      };

      // ACTUALIZAR REGISTRO DE CODIGO
      const updateResult = await this.codeRepository.update(
        { toEmail: email }, // CRITERIO, BUSCO POR EMAIL QUE ES UNIQUE
        newValues, // NUEVOS VALORES A REEMPLAZAR
      );

      // SI NO SE ACTUALIZO ES EL PRIMER REGISTRO ENTONCES INSERTAR
      if (updateResult.affected === 0) {
        // GUARDAR NUEVO REGISTRO EN LA DB (SE CUMPLE TU SEGUNDO REQUERIMIENTO PARCIAL)
        const newCodeRecordCode = this.codeRepository.create({
          toEmail: email,
          ...newValues,
        });
        this.logger.debug('NEWRECORDCODE', newCodeRecordCode);

        // GUARDAR EN DB DATOS DEL CODIGO
        await this.codeRepository.save(newCodeRecordCode);
      }

      // ENVIAR CON SERVICIO
      await this.sendEmailService({ email, code: generateCode });

      this.logger.debug({ token: verificationToken, sussess: true });

      return { token: verificationToken, success:true, expiresAt:expirationTime }; // RETORNAR EL TOKEN QUE EL FRONTEND DEBE ALMACENAR
    } catch (error) {
      // CAPTURAMOS CUALQUIER ERROR NO CONTROLADO
      const err = error as HttpException;
      this.logger.error(err?.message ?? String(error), (err as any)?.stack); // LOG PARA DEPURACION

      // SI EL ERROR YA FUE MANEJADO POR ERRORMANAGER, LO RELANZO TAL CUAL
      if (err instanceof ErrorManager) throw err;
      // SI NO, CREO UN ERROR 500 GENERICO CON FIRMA DE ERROR
      throw ErrorManager.createSignatureError(err?.message ?? 'Error desconocido en requestCode');
    }
  }

  // METODO PARA VERIFICAR CODIGO
  async verifyCode(verifyCodeDto: VerifyCodeDto): Promise<iMessageResponseStatus> {
    const { email, code, token } = verifyCodeDto; // DTO DE VERIFICACION

    // VERIFICAR EL JWT VERIFICAR FIRMA Y EXPIRACION DEL TOKEN
    try {
      const payload: iPayloadTokenVerifyEmail = this.jwtService.verify(token); // JWT VERIFICA FIRMA QUE VIENE DEL FRONTEND

      this.logger.debug('PAYLOAD', payload);
      // SI EL EMAIL DEL TOKEN COINCIDE CON EL EMAIL DEL CUERPO
      if (payload.email !== email || payload.type !== ETokenType.EMAIL_VERIFY) {
        // EL TOKEN NO CORRESPONDE A ESTE EMAIL/FLUJO
        ErrorManager.createSignatureError(`UNAUTHORIZED :: El token no corresponde al email o al flujo de verificación.`);
      }
    } catch (error) {
      // SI jwtService.verify FALLA LANZA EXCEPCIÓN.
      ErrorManager.createSignatureError(`UNAUTHORIZED :: Token inválido o expirado.`);
    }

    // VERIFICAR EN LA DB
    const verificationRecord: Code | null = await this.codeRepository.findOne({
      where: {
        toEmail: email,
        code: code,
        status: EStatusVerifyEmail.PENDING,
      },
    });

    // SI NO EXISTE EN LA BUSQUEDA
    if (!verificationRecord) {
      // EL CODIGO NO COINCIDE, YA FUE USADO, O NO EXISTE
      ErrorManager.createSignatureError(`NOT_FOUND :: Código de verificación incorrecto.`);
    }

    // ACTUALIZAR ESTADO (MARCAR COMO USADO)
    await this.codeRepository.update(
      { toEmail: email, code: code }, // FILTRO POR EL CODIGO Y EMAIL
      { status: EStatusVerifyEmail.USED }, // CAMBIAR EL ESTADO A USADO
    );

    // ENVIAR BOOLEAN DE EXITO
    return { message: 'Verificado con exito', success: true } as iMessageResponseStatus;
  }

  findAll() {
    return `This action returns all code`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}
