import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

import { CreateExpenseDto } from '../../expense/dto/create-expense.dto';
import { Expense } from '../../expense/expense.entity';

export class CreateBudgetDto {
  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @IsNumber()
  @IsNotEmpty()
  income: number;

  @ValidateNested({ each: true })
  @Type(() => CreateExpenseDto)
  @IsArray()
  expenses: Expense[];
}
