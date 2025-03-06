import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) { }

  async create(createLoginDto: CreateLoginDto) {
    let createUser = this.prisma.user.create({ data: { email: createLoginDto.email, password: createLoginDto.password } })
    return createUser
  }
}
