import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AlbumModule } from './album/album.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [LoginModule, AlbumModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
