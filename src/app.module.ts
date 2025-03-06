import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
