import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { ITokenResponse } from './../types/auth.types';
import { User } from './../user/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: AuthDto): Promise<ITokenResponse> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('invalid password');
    }

    return this.signToken(user.id, user.email);
  }

  async signUp(dto: AuthDto): Promise<ITokenResponse> {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (user) {
      throw new BadRequestException('user with this email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepo.create({ email: dto.email, password: hash });

    await this.userRepo.save(newUser);

    return this.signToken(newUser.id, newUser.email);
  }

  async signToken(userId: number, email: string): Promise<ITokenResponse> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '60m',
    });

    return {
      access_token: token,
    };
  }
}
