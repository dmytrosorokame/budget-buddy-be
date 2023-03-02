import { Body, Controller, Post } from '@nestjs/common';

import { User } from './../user/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: AuthDto): Promise<User> {
    return this.authService.login(dto);
  }

  @Post('/sign-up')
  signUp(@Body() dto: AuthDto): Promise<User> {
    return this.authService.signUp(dto);
  }
}
