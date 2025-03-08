import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UploadedFile, UseInterceptors, BadRequestException, } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto, } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AlbumPaginationDto } from 'src/album/dto/pagination-album.dto';
import { Bucket } from 'src/utils/bucket/bucketActions';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';

@Controller('images')
export class ImagesController {
  s3;
  constructor(private readonly imagesService: ImagesService) {
    this.s3 = new Bucket()
  }

  @Post("/user/:userId/album/:albumId")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async create(
    @UploadedFile("file")
    file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
    @Param("userId", ParseIntPipe) userId: number,
    @Param("albumId", ParseIntPipe) albumId: number
  ) {
    if (!file) {
      throw new BadRequestException("No se recibió ningún archivo");
    }
    return this.imagesService.create(createImageDto, { album_id: albumId, user_id: userId }, file.buffer.buffer as any);
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
