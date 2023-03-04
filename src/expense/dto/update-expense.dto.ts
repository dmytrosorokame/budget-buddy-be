import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator';

import { ExpensesTypes } from '../../types/expense.types';

export class UpdateExpenseDto {
  @IsEnum(ExpensesTypes)
  @IsOptional()
  type?: ExpensesTypes;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  amount?: number;
}
