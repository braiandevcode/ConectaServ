import { Users } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

// CAMBIE  ENTIDAD DE TASKER POR USUARIO
@Entity("locations")
export class Location {
    @PrimaryColumn()
    idLocation: string;
    @Column()
    locationName: string;

    //RELACIONES
    @ManyToOne(type=> Users, user=> user.location)
    public user: Users;
}