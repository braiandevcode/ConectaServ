import { Category } from 'src/category/entities/category.entity';
import { Context } from 'src/context/entities/context.entity';
import { Day } from 'src/day/entities/day.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { Hour } from 'src/hour/entities/hour.entity';
import { Location } from 'src/location/entities/location.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
  idTasker: string;

  @Column({ name: 'fullName', length: 150, nullable: false })
  fullName: string;

  @Column({ name: 'userName', length: 150, nullable: false })
  userName: string;

  @Column({
    name: 'email',
    length: 320,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  //RELACIONES MUCHOS A UNO => MUCHOS USUARIOS TENDRAN UNA LOCALIDAD
  @ManyToOne((type) => Location, (location) => location.user)
  @JoinColumn({ name: 'id_location' }) //==> UNION DE TABLAS
  location: Location;

  //RELACIONES MUCHOS A UNO => MUCHOS USUARIOS TENDRAN UNA MISMA CATEGORIA
  @ManyToOne((type) => Category, (category) => category.user)
  @JoinColumn({ name: 'id_category' }) //==> UNIR COLUMNAS
  category: Category;

  // REALACION  N:M CON SERVICIOS (subcategorias)
  @ManyToMany(() => Service, (services) => services.users)
  @JoinTable()
  services: Service[];

  // REALACION  N:M CON CONTEXTO(HABITOS) (subcategorias)
  @ManyToMany(() => Context, (contexts) => contexts.users)
  @JoinTable()
  contexts: Context[];

  // REALACION  N:M CON DIAS (subcategorias)
  @ManyToMany(() => Day, (days) => days.users)
  @JoinTable()
  days: Day[];

  // REALACION  N:M CON HORARIOS (subcategorias)
  @ManyToMany(() => Hour, (hours) => hours.users)
  @JoinTable()
  hours: Hour[];

  // REALACION  1:M UN USUARIO PUEDE TENER 1 O VARIAS IMAGENES DE EXPERIENCIAS
  @OneToMany(() => Experience, (image) =>image.user)
  imagesExperiences: Experience[];

  // REALACION 1:1 UN USUARIO PUEDE TENER SOLO UNA IMAGEN DE PERFIL
  @OneToOne(() => Profile, (image) =>image.user)
  imageProfile:Profile;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
