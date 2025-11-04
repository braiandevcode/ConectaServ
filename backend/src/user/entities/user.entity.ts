import { Category } from 'src/category/entities/category.entity';
import { Location } from 'src/location/entities/location.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryColumn({ name: 'id_user', type: 'char', length: 36 })
  idTasker: string;

  @Column({ name: 'fullName', length: 150 })
  fullName: string;

  @Column({ name: 'userName', length: 150 })
  userName: string;

  @Column({ unique: true, length: 320 })
  email: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  password: string;

  //RELACIONES MUCHOS A UNO => MUCHOS USUARIOS TENDRAN UNA LOCALIDAD
  // Y UNA LOCALIDAD PUEDE PERTENECER A MUCHOS USUARIOS
  @ManyToOne((type) => Location, (location) => location.user)
  @JoinColumn()
  public location: Location;

  //RELACIONES MUCHOS A UNO => MUCHOS USUARIOS TENDRAN UNA CATEGORIA
  // Y UNA CATEGORIA PUEDE PERTENECER A MUCHOS USUARIOS
  @ManyToOne((type) => Category, (category) => category.user)
  @JoinColumn() //==> UNIR COLUMNAS
  public category: Category;

  // Relación N:M con servicios (subcategorias)
  @ManyToMany(() => Service, (service) => service.taskers)
  @JoinTable()
  services: Service[];
}
