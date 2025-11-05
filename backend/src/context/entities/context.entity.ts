import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// ENTIDAD DE HABITOS ELEGIDOS
@Entity('contexts')
export class Context {
  @PrimaryGeneratedColumn('uuid', { name: 'id_context' })
  idContext: string;

  @Column({ name: 'context_name', type:'varchar', length:250, nullable:false })
  contextName: string;

  @ManyToMany(() => User, (users) => users.contexts)
  users: User[];
}
