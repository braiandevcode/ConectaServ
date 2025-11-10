import {
  CreateDateColumn,
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

@Entity('taskers')
export class Tasker {
  @PrimaryGeneratedColumn('uuid', { name: 'id_tasker' })
  idTasker: string;

  //RELACIONES MUCHOS A UNO => MUCHOS TASKERS TENDRAN UNA MISMA CATEGORIA
  @ManyToOne(() => Category, (category) => category.tasker)
  @JoinColumn({ name: 'id_category' }) //==> UNIR COLUMNAS
  category: Category;

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS SERVICIOS ELEGIDOS
  @ManyToMany(() => Service, (services) => services.taskers)
  @JoinTable()
  services: Service[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS HABITOS DE TRABAJO ELEGIDOS
  @ManyToMany(() => Context, (contexts) => contexts.users)
  @JoinTable()
  contexts: Context[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS DIAS ELEGIDOS
  @ManyToMany(() => Day, (day) => day.taskers)
  @JoinTable()
  days: Day[];

  // REALACION  N:M UN TASKER PUEDE TENER UNO O MUCHOS HORARIOS ELEGIDOS
  @ManyToMany(() => Hour, (hours) => hours.users)
  @JoinTable()
  hours: Hour[];

  // RELACION  1:1 UN TASKER SOLO ESTA ASOCIADO A UN REGISTRO DE DETALLES DE SU PERFIL
  @OneToOne(() => DetailsProfileTasker, (details) => details.tasker)
  @JoinColumn({ name: 'id_details_profile_tasker' }) // ==> FK
  detailsProfileTasker: DetailsProfileTasker;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
