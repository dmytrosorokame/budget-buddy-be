import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';

import { GetUser } from './../auth/decorators/get-user.decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { User } from './../user/user.entity';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto';

@UseGuards(JwtGuard)
@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Get()
  getAll(@GetUser('id') userId: number): Promise<Budget[]> {
    return this.budgetService.getAll(userId);
  }

  @Post()
  create(@GetUser() user: User, @Body() dto: CreateBudgetDto): Promise<Budget> {
    return this.budgetService.create(user, dto);
  }
}
