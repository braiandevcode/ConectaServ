import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

//ENTIDAD DE LOCALIDAD ELEGIDA POR EL USUAURIO
@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('uuid', { name: 'id_category' })
    idLocation: string;
    @Column({ type: 'varchar', length:150, nullable:false})
    locationName: string;

    //RELACIONES ==> UNA MISMA LOCALIDAD PUEDE PERTENECER A MUCHOS USUARIOS
    @OneToMany((type) => User, (user) => user.location)
    public user: User[]; //==> VARIOS USUARIOS TIENEN ESTA LOCALIZACIÓN


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
