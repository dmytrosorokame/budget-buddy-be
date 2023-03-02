import { Body, Controller, Post } from '@nestjs/common';

import { ITokenResponse } from './../types/auth.types';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: AuthDto): Promise<ITokenResponse> {
    return this.authService.login(dto);
  }

  @Post('/sign-up')
  signUp(@Body() dto: AuthDto): Promise<ITokenResponse> {
    return this.authService.signUp(dto);
  }
}
