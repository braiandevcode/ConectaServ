import { Location } from 'src/location/entities/location.entity';
import { Role } from 'src/role/entities/role.entity';

import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Check('"active" IN (0, 1)')
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

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({
    name: 'verified',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  verified: boolean;

  @Column({
    name: 'active',
    type: 'int',
    nullable: false,
    default: 0,
  })
  active: number;

  //RELACIONES MUCHOS A UNO => MUCHOS USUARIOS TENDRAN UNA LOCALIDAD
  @ManyToOne(() => Location, (location) => location.user)
  @JoinColumn({ name: 'id_location' }) //==> UNION DE TABLAS
  location: Location;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() // ==> UNIR EN ESTA ENTIDAD YA QUE ES DUEÑA (CONTIENE LA RELACION DE ROLES)
  roles:Role[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
