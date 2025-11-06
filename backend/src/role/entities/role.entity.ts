import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn('uuid',{ name: 'id_role'})
    idRole: string;

    @Column({ name: 'name_role', type:'varchar', length:50, nullable:false })
    nameRole:string;

    @ManyToMany(() => User, (user) => user.roles)
    users:User[]
}
