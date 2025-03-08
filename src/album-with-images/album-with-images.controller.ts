import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumWithImagesService } from './album-with-images.service';
import { CreateAlbumWithImageDto } from './dto/create-album-with-image.dto';
import { UpdateAlbumWithImageDto } from './dto/update-album-with-image.dto';

@Controller('album-with-images')
export class AlbumWithImagesController {
  constructor(private readonly albumWithImagesService: AlbumWithImagesService) {}

  @Post()
  create(@Body() createAlbumWithImageDto: CreateAlbumWithImageDto) {
    return this.albumWithImagesService.create(createAlbumWithImageDto);
  }

  @Get()
  findAll() {
    return this.albumWithImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumWithImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumWithImageDto: UpdateAlbumWithImageDto) {
    return this.albumWithImagesService.update(+id, updateAlbumWithImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumWithImagesService.remove(+id);
  }
}
