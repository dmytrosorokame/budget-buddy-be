import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../user/user.entity';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
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
}
