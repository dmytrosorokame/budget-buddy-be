import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, ValidateNested, IsOptional } from 'class-validator';

import { Expense } from '../../expense/expense.entity';

import { UpdateExpenseDto } from './../../expense/dto/update-expense.dto';

export class UpdateBudgetDto {
  @IsDateString()
  @IsOptional()
  created_at?: Date;

  @IsNumber()
  @IsOptional()
  income?: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateExpenseDto)
  @IsArray()
  @IsOptional()
  expenses?: Expense[];
}
