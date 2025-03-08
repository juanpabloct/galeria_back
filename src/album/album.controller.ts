import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumPaginationDto } from './dto/pagination-album.dto';

@Controller('/:userId/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post()
  async create(@Param("userId") userId: number, @Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto, userId);
  }

  @Get()
  async findAll(@Query() pagination: AlbumPaginationDto) {
    return this.albumService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
