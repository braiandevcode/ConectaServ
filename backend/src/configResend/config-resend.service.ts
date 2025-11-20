import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class ConfigResendService {
//   //EXPLICACION DE getOrThrow() DEL MODULO DE CongigModule:
//   // INDICA AL COMPILADOR TS:
//   // NO ME ADVIERTAS EL undefined
//   // ESTAMOS SEGUROS DE QUE EL TIPO ES EL QUE INDICAMOS NO ES INDEFINIDO, PORQUE YA VALIDAMOS SU EXISTENCIA ANTES CON
//   // LIBRERIA JOI AL INICIAR LA APP EN app.module.ts

//   constructor(private readonly configService: ConfigService) {}

//   // CONFIGURAR Y LEER VARIABLES ENTORNO DE CREDENCIALES
//   public configCredentialsEmailjs(): iConfigDataEmailJs {
//     const DATA_EMAILJS: iConfigDataEmailJs = {
//       // CARGAR LA PUBLIC_KEY DESDE VARIABLE DE ENTORNO
//       PUBLIC_KEY: this.configService.getOrThrow<string>('PUBLIC_KEY'), // ==> CLAVE PUBLICA
//       SERVICE_ID: this.configService.getOrThrow<string>('SERVICE_ID'), // ==> ID SERVICIO
//       TEMPLATE_ID:
//         this.configService.getOrThrow<string>('TEMPLATE_ID'), // ==> ID PLANTILLA
//     };
//     return DATA_EMAILJS;
//   }

//   // OBTENER OBJETO DE CREDENCIALES CON GET ACCESOR
//   get emailjsKey(): iConfigDataEmailJs {
//     return this.configCredentialsEmailjs();
//   }

//   // LOS GET QUE NO SOLO MUESTRAN SINO QUE HACEN ALGO EXTRA LAS NOMBRO COMO METODO  NO COMO ACCESOR
//   public getKey(): iParamsInit {
//     const { PUBLIC_KEY } = this.emailjsKey; //DESESTRUCTURO OBJETO
//     return {
//       options: {
//         publicKey: PUBLIC_KEY,
//       },
//     };
//   }
// }

// INTERFAZ PARA TIPAR LAS CREDENCIALES
export interface iConfigDataResend {
  RESEND_API_KEY: string;
}

@Injectable()
export class ConfigResendService {
  // EXPLICACION DE getOrThrow() DEL MODULO DE ConfigModule:
  // INDICA AL COMPILADOR TS:
  // NO ME ADVIERTAS EL UNDEFINED
  // ESTAMOS SEGUROS DE QUE EL TIPO ES EL QUE INDICAMOS Y NO ES INDEFINIDO
  // PORQUE YA VALIDAMOS SU EXISTENCIA CON JOI AL INICIAR LA APP (app.module.ts)

  constructor(private readonly configService: ConfigService) {}

  // CONFIGURAR Y LEER VARIABLES DE ENTORNO DE RESEND
  private configCredentialsResend(): iConfigDataResend {
    const DATA_RESEND: iConfigDataResend = {
      // CARGAR LA RESEND_API_KEY DESDE VARIABLE DE ENTORNO
      RESEND_API_KEY: this.configService.getOrThrow<string>('RESEND_API_KEY'), // ==> API KEY
    };
    return DATA_RESEND;
  }

  // OBTENER OBJETO DE CREDENCIALES CON GET ACCESOR
  get resendKey(): iConfigDataResend {
    return this.configCredentialsResend();
  }

  // LOS GET QUE HACEN ALGO EXTRA LOS NOMBRO COMO METODO
  public getClientInit() {
    const { RESEND_API_KEY } = this.resendKey; // DESESTRUCTURO OBJETO

    // ESTE OBJETO ES EL QUE PASARAS AL SERVICIO DE ENVÍO
    return { apiKey: RESEND_API_KEY };
  }
}

