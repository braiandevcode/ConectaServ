import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// TAMBIEN CAMBIE A USUARIO
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'id_category' })
  idCategory: string;
  @Column({
    name: 'category_name',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  categoryName: string;

  //RELACION ==> UNA CATEGORIA PUEDE PERTENCER A VARIOS USUARIOS
  @OneToMany((type) => User, (user) => user.category)
  public user: User[]; //==> USUARIOS QUE PERTENECE A ESA CATEGORIA

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date; // SE ACTUALIZA AUTOMÁTICAMENTE AL MODIFICAR
}
