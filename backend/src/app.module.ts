import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './location/locations.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tasker } from './tasker/entities/tasker.entity';
import { Location } from './location/entities/location.entity';
import { Category } from './category/entities/category.entity';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContextsModule } from './contexts/contexts.module';
import { HoursModule } from './hours/hours.module';
import { DaysModule } from './days/days.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ContextModule } from './context/context.module';
import { HourModule } from './hour/hour.module';
import { DayModule } from './day/day.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // CONFIGURACION DE MODULO PARA VARIABLE DE ENTORNOS
    ConfigModule.forRoot({
      // CARGA VARIABLES DE ENTORNO DESDE ARCHIVO .ENV
      isGlobal: true, // DISPONIBLE EN TODA LA APP SIN VOLVER A IMPORTAR
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}.local`, // ARCHIVO .ENV SEGUN EL ENTORNO
    }),
    // CONECTAR BASE DE DATOS
    TypeOrmModule.forRootAsync({
      // CONFIGURA TYPEORM DE FORMA ASÍNCRONA (PERMITE USAR CONFIGSERVICE)
      imports: [ConfigModule], // IMPORTA CONFIGMODULE PARA PODER USAR VARIABLES DE ENTORNO
      inject: [ConfigService], // INYECTA CONFIGSERVICE DENTRO DEL useFactory
      useFactory: (config: ConfigService) => ({
        // FUNCIÓN QUE DEVUELVE LA CONFIG DE LA DB
        type: 'mysql', // TIPO DE BASE DE DATOS
        host: config.get<string>('DB_HOST'), // HOST DE LA DB
        port: config.get<number>('DB_PORT'), // PUERTO DE LA DB
        username: config.get<string>('DB_USERNAME'), // USUARIO DE LA DB
        password: config.get<string>('DB_PASSWORD'), // PASSWORD DE LA DB
        database: config.get<string>('DB_NAME'), // NOMBRE DE LA BASE DE DATOS
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // ENTIDADES QUE VA A LEER
        synchronize: true, // AUTO SINCRONIZA SCHEMA (NO USAR EN PRODUCCIÓN)
      }),
    }),
    Tasker,
    Location,
    Category,
    ServicesModule,
    AuthModule,
    UserModule,
    ContextsModule,
    HoursModule,
    DaysModule,
    ProfilesModule,
    ExperiencesModule,
    ContextModule,
    HourModule,
    DayModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
