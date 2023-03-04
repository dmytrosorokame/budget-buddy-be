import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { ExpensesTypes } from '../../types/expense.types';

export class CreateExpenseDto {
  @IsEnum(ExpensesTypes)
  @IsNotEmpty()
  type: ExpensesTypes;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}
