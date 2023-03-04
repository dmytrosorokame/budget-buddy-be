import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return budgets;
  }

  async create(user: User, dto: CreateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepo.create({ ...dto, user });

    return this.budgetRepo.save(budget);
  }

  async update(budgetId: number, dto: UpdateBudgetDto): Promise<Budget> {
    const { expenses, ...other } = dto;

    if (expenses) {
      for (const expense of dto.expenses) {
        await this.expenseRepo.update(expense.id, expense);
      }
    }

    await this.budgetRepo.update(budgetId, other);

    return this.budgetRepo.findOne({ where: { id: budgetId } });
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
