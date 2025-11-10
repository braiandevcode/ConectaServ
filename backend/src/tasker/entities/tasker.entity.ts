import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Service } from 'src/services/entities/service.entity';
import { Context } from 'src/context/entities/context.entity';
import { Day } from 'src/day/entities/day.entity';
import { Hour } from 'src/hour/entities/hour.entity';
import { DetailsProfileTasker } from 'src/details_profile_taskers/entities/details_profile_tasker.entity';
import { JoinMannager } from 'src/config/JoinMannager.';
import { User } from 'src/user/entities/user.entity';

@Entity('taskers')
export class Tasker {
  @PrimaryGeneratedColumn('uuid', { name: 'id_tasker' })
  idTasker: string;

  //RELACIONES MUCHOS A UNO => MUCHOS TASKERS TENDRAN UNA MISMA CATEGORIA
  @ManyToOne(() => Category, (category) => category.taskers, { cascade: true })
  @JoinColumn(
    JoinMannager.manyToOneConfig({
      current: {
        name: 'id_category',
        referencedColumnName: 'idCategory',
        fkName: 'fk_tasker_category',
      },
    }),
  ) //==> UNIR COLUMNAS
  category: Category;

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS SERVICIOS ELEGIDOS
  @ManyToMany(() => Service, (services) => services.taskers, { cascade: true })
  @JoinTable(
    JoinMannager.manyToManyConfig({
      //CLASE CONFIGURATIVA PERSONAL
      current: {
        name: 'id_tasker',
        referencedColumnName: 'idTasker',
        fkName: 'fk_tasker_service_tasker', //==> NOMBRE DE LA CLAVE FORANEA HACIA TASKER
      }, //COLUMNA ENTIDAD ACTUAL
      related: {
        name: 'id_service',
        referencedColumnName: 'idService',
        fkName: 'fk_tasker_service_service', // NOMBRE DE LA CLAVE FORANEA HACIA SERVICE
      }, //COLUMNA ENTIDAD RELACIONADA
    }),
  )
  services: Service[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS HABITOS DE TRABAJO ELEGIDOS
  @ManyToMany(() => Context, (contexts) => contexts.taskers, { cascade: true })
  @JoinTable(
    JoinMannager.manyToManyConfig({
      //CLASE CONFIGURATIVA PERSONAL
      current: {
        name: 'id_tasker',
        referencedColumnName: 'idTasker',
        fkName: 'fk_tasker_context_tasker', //==> NOMBRE DE LA CLAVE FORANEA HACIA TASKER
      }, //COLUMNA ENTIDAD ACTUAL
      related: {
        name: 'id_context',
        referencedColumnName: 'idContext',
        fkName: 'fk_tasker_context_context', // NOMBRE DE LA CLAVE FORANEA HACIA CONTEXT
      }, //COLUMNA ENTIDAD RELACIONADA
    }),
  )
  contexts: Context[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS DIAS ELEGIDOS
  @ManyToMany(() => Day, (day) => day.taskers, { cascade: true })
  @JoinTable(
    JoinMannager.manyToManyConfig({
      //CLASE CONFIGURATIVA PERSONAL
      current: {
        name: 'id_tasker',
        referencedColumnName: 'idTasker',
        fkName: 'fk_tasker_day_tasker', //==> NOMBRE DE LA CLAVE FORANEA HACIA TASKER
      }, //COLUMNA ENTIDAD ACTUAL
      related: {
        name: 'id_day',
        referencedColumnName: 'idDay',
        fkName: 'fk_tasker_day_day', // NOMBRE DE LA CLAVE FORANEA HACIA DIA
      }, //COLUMNA ENTIDAD RELACIONADA
    }),
  )
  days: Day[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS HORARIOS ELEGIDOS
  @ManyToMany(() => Hour, (hours) => hours.users, { cascade: true })
  @JoinTable(
    JoinMannager.manyToManyConfig({
      //CLASE CONFIGURATIVA PERSONAL
      current: {
        name: 'id_tasker',
        referencedColumnName: 'idTasker',
        fkName: 'fk_tasker_hour_tasker', //==> NOMBRE DE LA CLAVE FORANEA HACIA TASKER
      }, //COLUMNA ENTIDAD ACTUAL
      related: {
        name: 'id_hour',
        referencedColumnName: 'idHour',
        fkName: 'fk_tasker_hour_hour', // NOMBRE DE LA CLAVE FORANEA HACIA HORARIOS
      }, //COLUMNA ENTIDAD RELACIONADA
    }),
  )
  hours: Hour[];

  // RELACION  1:1 UN TASKER SOLO ESTA ASOCIADO A UN REGISTRO DE DETALLES DE SU PERFIL
  @OneToOne(() => DetailsProfileTasker, (details) => details.tasker, {
    cascade: true,
  })
  @JoinColumn(
    JoinMannager.manyToOneConfig({
      current: {
        name: 'id_details_profile_tasker',
        referencedColumnName: 'idDetailsProfileTasker',
        fkName: 'fk_tasker_details_profile_tasker',
      },
    }),
  ) // ==> FK
  detailsProfileTasker: DetailsProfileTasker;

  // RELACION 1:1 UN TASKER SOLO PODRA ESTAR ASOCIADO A UN USUARIO
  @OneToOne(() => User, (user) => user.tasker, { cascade: true })
  @JoinColumn(
    JoinMannager.manyToOneConfig({
      current: {
        name: 'id_user',
        referencedColumnName: 'idUser',
        fkName: 'fk_tasker_user',
      },
    }),
  )
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', type: 'timestamp' })
  deleteAt: Date;
}
