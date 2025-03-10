import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumPaginationDto } from './dto/pagination-album.dto';

@Controller('/user/:userId/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Post()
  async create(@Param("userId", ParseIntPipe) userId: number, @Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto, userId);
  }

  @Get()
  async findAll(@Param("userId", ParseIntPipe) userId, @Query() pagination?: AlbumPaginationDto) {
    return this.albumService.findAll(userId, pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.remove(+id);
  }
}
