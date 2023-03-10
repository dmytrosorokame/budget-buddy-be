import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Expense } from './../expense/expense.entity';
import { User } from './../user/user.entity';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
  ) {}

  async getAll(userId: number): Promise<Budget[]> {
    const budgets = await this.budgetRepo.find({
      relations: ['user', 'expenses'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return budgets;
  }

  async getOne(budgetId: number, userId: number): Promise<Budget> {
    const budget = await this.budgetRepo.findOne({ relations: ['user', 'expenses'], where: { id: budgetId } });

    if (budget?.user?.id !== userId) {
      throw new MethodNotAllowedException("You can't get not your budget");
    }

    return budget;
  }

  async create(user: User, dto: CreateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepo.create({ ...dto, user });

    return this.budgetRepo.save(budget);
  }

  async update(budgetId: number, dto: UpdateBudgetDto): Promise<Budget> {
    const { expenses, ...other } = dto;

    const budget = await this.budgetRepo.findOne({ where: { id: budgetId } });

    if (expenses) {
      for (const expense of dto.expenses) {
        const currentExpense = await this.expenseRepo.findOne({ where: { id: expense.id } });

        if (!currentExpense) {
          const createdExpense = await this.expenseRepo.create({
            type: expense.type,
            amount: expense.amount,
            name: expense.name,
            budget,
          });

          await this.expenseRepo.save(createdExpense);
        } else {
          await this.expenseRepo.update(expense.id, expense);
        }
      }
    }

    await this.budgetRepo.update(budgetId, other);

    return this.budgetRepo.findOne({ relations: ['user', 'expenses'], where: { id: budgetId } });
  }

  async delete(budgetId: number): Promise<Budget> {
    const budget = await this.budgetRepo.findOne({ where: { id: budgetId } });

    if (!budget) {
      throw new NotFoundException('budget not found');
    }

    await this.budgetRepo.delete(budgetId);

    return budget;
  }
}
