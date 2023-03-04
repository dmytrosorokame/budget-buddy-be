import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Budget } from './../budget/budget.entity';
import { Currency } from './../types/user.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('varchar', { default: 'USD' })
  currency: Currency;

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];
}
