import { Module } from '@nestjs/common';
import { AlbumWithImagesService } from './album-with-images.service';
import { AlbumWithImagesController } from './album-with-images.controller';

@Module({
  controllers: [AlbumWithImagesController],
  providers: [AlbumWithImagesService],
})
export class AlbumWithImagesModule {}
