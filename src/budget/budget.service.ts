import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Budget } from './budget.entity';

@Injectable()
export class BudgetService {
  constructor(@InjectRepository(Budget) private budgetRepo: Repository<Budget>) {}

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
}
