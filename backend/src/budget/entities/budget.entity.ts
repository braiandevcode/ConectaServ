import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid', { name: 'id_budget' })
  idBudget: string;

  @Column({ name: 'option_budge', type: 'varchar', length: 3, nullable: true })
  budge: string;

  @Column({
    name: 'option_reinsert',
    type: 'varchar',
    length: 3,
    nullable: true,
  })
  reinsert: string;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10, //TOTAL DE DIGITOS
    scale: 2, //DESPUES DEL DECIMAL
    nullable: true,
  })
  amount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date; // SE ACTUALIZA AUTOMÁTICAMENTE AL MODIFICAR
}
