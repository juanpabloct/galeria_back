import { Controller, Get, Param, ParseIntPipe, } from '@nestjs/common';
import { AlbumWithImagesService } from './album-with-images.service';

@Controller('/user/:userId/album/:albumId/images')
export class AlbumWithImagesController {
  constructor(private readonly albumWithImagesService: AlbumWithImagesService) { }

  @Get()
  findAllImagesWithAlbum(@Param("userId", ParseIntPipe) userId: number, @Param("albumId", ParseIntPipe) albumId: number) {
    return this.albumWithImagesService.findAll({ userId, albumId });
  }


}
