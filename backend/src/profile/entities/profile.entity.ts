import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('Profiles')
export class Profile {
        @PrimaryColumn({ name: 'id_profile', type: 'uuid' }) //ID IMAGEN UUID VIENE DEL FRONT
        idLocation: string;
        @Column({ name: 'image_base64', type: 'text', nullable: false })
        imageBase64: string;
      
        @Column({ name: 'mime_type', type: 'varchar', length: 100, nullable: false })
        mimeType: string;
      
        @Column({ name: 'size', type: 'int', unsigned: true, nullable: false })
        size: number;
      
        @Column({
          name: 'original_name',
          type: 'varchar',
          length: 250,
          nullable: false,
        })
        originalName: string;
      
        @Column({
          name: 'order',
          type: 'tinyint',
          unsigned: true,
          nullable: false,
        })
        order: number;
      
        // RELACION 1:1 UN PERFIL SOLO PERTENECE A UN USUARIO
        @OneToOne(() => User, (user) => user.imageProfile)
        @JoinColumn({ name: 'id_user' }) // FK EN TABLA PERFIL
        user: User;
      
        @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
        createdAt: Date;
      
        @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
        updatedAt: Date;
}
