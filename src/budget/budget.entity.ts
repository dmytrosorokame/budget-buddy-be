import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Expense } from './../expense/expense.entity';
import { User } from './../user/user.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;

  @OneToMany(() => Expense, (expense) => expense.budget, { cascade: true })
  expenses: Expense[];
}
