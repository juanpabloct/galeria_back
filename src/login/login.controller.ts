import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { PasswordHash } from './passwordHash.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async create(@Body(PasswordHash) createLoginDto: CreateLoginDto,) {
    return await this.loginService.create(createLoginDto);
  }
}
