import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Budget } from './../budget/budget.entity';
import { ExpensesTypes } from './../types/expense.types';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ExpensesTypes;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  budget: Budget;
}
