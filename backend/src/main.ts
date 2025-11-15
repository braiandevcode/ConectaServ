import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorManager } from './config/ErrorMannager';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // APLICAR EL PIPE GLOBALMENTE
  app.useGlobalPipes(
    // CONFIGIURAR
    new ValidationPipe({
      whitelist: true, // IGNORA PROPIEDADES QUE NO ESTEN EN EL DTO.
      forbidNonWhitelisted: true, // LANZA ERROR SI SE ENVIAN PROPIEDADES EXTRAS.
      transform: true, // CONVIERTE AL BODY AL TIPO DEL DTO.

      exceptionFactory: (errors: ValidationError[]) => {
        // FUNCION RECURSIVA PARA EXTRAER MENSAJES DE ERRORES ANIDADOS (DTO DENTRO DE DTO)
        const getMessages = (validationErrors: ValidationError[]) => {
          return validationErrors.flatMap((err) => {
            // 1. EXTRAE MENSAJES DE RESTRICCIONES (CONSTRAINTS) DEL NIVEL ACTUAL
            const currentMessages: string[] = err.constraints
              ? Object.values(err.constraints)
              : [];

            // 2. SI EXISTEN ERRORES HIJOS (CHILDREN), LLAMA RECURSIVAMENTE Y UNE LOS MENSAJES
            const childMessages =
              err.children && err.children.length > 0
                ? getMessages(err.children)
                : [];

            // RETORNA TODOS LOS MENSAJES EN UN SOLO ARRAY PARA EL FLATMAP
            return [...currentMessages, ...childMessages];
          });
        };

        // AQUI CONTINUARIA LA LOGICA PARA UNIR LOS MENSAJES Y LLAMAR A ERRORMANAGER
        const messagesArray: string[] = getMessages(errors);
        const messagesString: string = messagesArray.join(', ');

        const finalMessage: string =
          messagesString ||
          'FALTAN DATOS OBLIGATORIOS O LA ESTRUCTURA ES INVALIDA.';

        return new ErrorManager({
          message: finalMessage,
          type: 'BAD_REQUEST',
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
