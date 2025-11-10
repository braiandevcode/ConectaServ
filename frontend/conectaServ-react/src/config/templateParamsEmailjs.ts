import type { TVerifyCode } from "../types/typeVerifyCode";

// OBJETO DE CONFIGURACION PARA ENVIO
export const templateParamsEmailjs = ({ to_email, verification_code }: TVerifyCode): TVerifyCode => ({
    to_email, // ==> CORREO DE DESTINO
    verification_code, //==> CODIGO GENERADO A LA PLANTILLA
});