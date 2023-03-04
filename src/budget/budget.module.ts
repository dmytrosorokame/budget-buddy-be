import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Expense } from './../expense/expense.entity';
import { BudgetController } from './budget.controller';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Expense])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
