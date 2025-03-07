import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AlbumPaginationDto } from './dto/pagination-album.dto';

@Injectable()
export class AlbumService {
  constructor(readonly prisma: PrismaService) { }
  async create(createAlbum: CreateAlbumDto, idUser: number) {
    return this.prisma.album.create({
      data: {
        name: createAlbum.name,
        isPublic: createAlbum.isPublic,
        user_id: idUser
      }
    })
  }

  findAll({ limit = 0, page = 10 }: AlbumPaginationDto) {
    return this.prisma.album.findMany({
      skip: page, take: limit
    });
  }

  findOne(id: number) {
    return this.prisma.album.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.prisma.album.update({
      where: { id }, data: {
        name: updateAlbumDto.name,
        isPublic: updateAlbumDto.isPublic
      }
    });
  }

  remove(id: number) {
    return this.prisma.album.delete({
      where: {
        id: id
      }
    })
  }
}
