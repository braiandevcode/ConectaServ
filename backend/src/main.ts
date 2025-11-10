import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // APLICAR EL PIPE GLOBALMENTE
  app.useGlobalPipes(
    // CONFIGIURAR
    new ValidationPipe({
      whitelist: true, // IGNORA PROPIEDADES QUE NO ESTEN EN EL DTO.
      forbidNonWhitelisted: true, // LANZA ERROR SI SE ENVIAN PROPIEDADES EXTRAS.
      transform: true, // CONVIERTE AL BODY AL TIPO DEL DTO.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
