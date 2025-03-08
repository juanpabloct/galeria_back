import { Module } from '@nestjs/common';
import { AlbumWithImagesService } from './album-with-images.service';
import { AlbumWithImagesController } from './album-with-images.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlbumWithImagesController],
  providers: [AlbumWithImagesService, PrismaService],
})
export class AlbumWithImagesModule { }
