import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from 'src/prisma.service';
import { AccessLoginDto } from './dto/acces-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService,
    private readonly jwtService: JwtService) { }

  async create(createLoginDto: CreateLoginDto) {
    let createUser = this.prisma.user.create({ data: { email: createLoginDto.email, password: createLoginDto.password } })
    return createUser
  }
  async findByEmail(email: string) {
    let findUser = this.prisma.user.findUnique({ where: { email } })
    return findUser
  }

  async login(user: AccessLoginDto) {
    let findUser = await this.findByEmail(user.email);
    const payload = { username: findUser.email, sub: findUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
