import { Users } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

// TAMBIEN CAMBIE A USUARIO
@Entity("categories")
export class Category {
    @PrimaryColumn()
    idCategory: string;
    @Column()
    category_name: string;

    //Relaciones
    @ManyToOne(type=>Users, user=>user.category)
    public user: Users;
}