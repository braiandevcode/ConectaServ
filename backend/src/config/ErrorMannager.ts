import { HttpException, HttpStatus } from '@nestjs/common';

// OBJETO CONFIGURATIVO PARA ERRORES
export class ErrorManager extends Error {
  // CONSTRUCTOR ==> type ES DEL TIPO DE CADA CLAVE QUE VIENE DEL ENUM HttpStatus
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name: string = message.split(' :: ')[0]; //==> POSICION DE INDICE 0 DONDE ESTA EL VALOR DEL TIPO DE ERROR

    // SI EXISTE UN TIPO
    if (name) {
      throw new HttpException(message, HttpStatus[name]); //EL MENSAJE QUE SE LE PASE + EL TIPO DE ERROR
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR); //SI ES DESCONOCIDO, EL MENSAJE Y EL INTERNAL SRVER COMO TIPO DE ERROR
    }
  }
}
