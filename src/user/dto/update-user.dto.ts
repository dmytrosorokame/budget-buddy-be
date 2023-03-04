import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Currency } from './../../types/user.types';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;
}
