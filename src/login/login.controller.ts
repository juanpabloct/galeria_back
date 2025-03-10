import { Controller, Post, Body, } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { PasswordHash } from './passwordHash.pipe';
import { AccessLoginDto } from './dto/acces-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,) { }

  @Post()
  async login(@Body() user: AccessLoginDto) {
    return await this.loginService.login(user)
  }
  @Post("/newUser")
  async create(@Body(PasswordHash) createLoginDto: CreateLoginDto,) {
    return await this.loginService.create(createLoginDto);
  }
}
