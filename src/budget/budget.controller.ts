import { Controller, Get, UseGuards, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { GetUser } from './../auth/decorators/get-user.decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { User } from './../user/user.entity';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

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

  @Patch(':id')
  update(@Param('id') budgetId: number, @Body() dto: UpdateBudgetDto): Promise<Budget> {
    return this.budgetService.update(budgetId, dto);
  }

  @Delete(':id')
  delete(@Param('id') budgetId: number): Promise<Budget> {
    return this.budgetService.delete(budgetId);
  }
}
