import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Budget } from './../budget/budget.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Budget, (budget) => budget.user, { cascade: true })
  budgets: Budget[];
}
