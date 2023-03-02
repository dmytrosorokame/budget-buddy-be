import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './../user/user.entity';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async login(dto: AuthDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('invalid password');
    }

    return user;
  }

  async signUp(dto: AuthDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (user) {
      throw new BadRequestException('user with this email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepo.create({ email: dto.email, password: hash });

    return this.userRepo.save(newUser);
  }
}
