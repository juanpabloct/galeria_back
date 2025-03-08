import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto, CreateParamsImage } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AlbumPaginationDto } from 'src/album/dto/pagination-album.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post("/user/:userId/album/:albumId")
  create(@Body() createImageDto: CreateImageDto, @Param("userId", ParseIntPipe) userId: CreateParamsImage["user_id"], @Param("albumId", ParseIntPipe) albumId: CreateParamsImage["album_id"]) {
    return this.imagesService.create(createImageDto, { album_id: albumId, user_id: userId });
  }

  @Get("/user/:userId")
  findAll(@Param("userId", ParseIntPipe) userId: number, @Query() pagination?: AlbumPaginationDto) {
    return this.imagesService.findAll(userId, pagination);
  }

  @Get('/image/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch('/image/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete('/image/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.imagesService.remove(+id);
  }
}
