import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepo.update({ id: userId }, dto);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    delete user.password;

    return user;
  }
}
