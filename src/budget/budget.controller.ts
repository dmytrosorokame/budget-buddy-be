import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from './../auth/decorators/get-user.decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';

@UseGuards(JwtGuard)
@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Get()
  getAll(@GetUser('id') userId: number): Promise<Budget[]> {
    return this.budgetService.getAll(userId);
  }
}
