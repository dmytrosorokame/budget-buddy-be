import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { GetUser } from './../auth/decorators/get-user.decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Patch()
  changeUser(@GetUser('id') userId: number, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(userId, dto);
  }
}
