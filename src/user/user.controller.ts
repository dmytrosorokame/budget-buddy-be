import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from './../auth/decorators/get-user.decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { User } from './user.entity';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User): User {
    return user;
  }
}
