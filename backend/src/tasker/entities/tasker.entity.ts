// import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
// import { Category } from "src/category/entities/category.entity";
// import { Location } from "src/location/entities/location.entity";
// import { Service } from "src/services/entities/service.entity";

// @Entity("taskers")
// export class Tasker {
//     @PrimaryColumn({ name: "id_tasker", type: "char", length: 36 })
//     idTasker: string;

//     @Column({ name: "fullName", length: 150 })
//     fullName: string;

//     @Column({ name: "userName", length: 150 })
//     userName: string;

//     @Column("text", { nullable: true })
//     description: string;

//     @Column({ unique: true, length: 320 })
//     email: string;

//     @Column()
//     password: string;

//     //Relaciones
//     @ManyToOne(type => Location, location => location.tasker)
//     @JoinColumn()
//     public location: Location;

//     @ManyToOne(type => Category, category => category.tasker)
//     @JoinColumn()
//     public category: Category;

//     // Relación N:M con servicios (subcategorias)
//     @ManyToMany(() => Service, service => service.taskers)
//     @JoinTable()
//     services: Service[];
// }
