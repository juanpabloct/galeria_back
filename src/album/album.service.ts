import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';
import { AlbumPaginationDto } from './dto/pagination-album.dto';

@Injectable()
export class AlbumService {
  constructor(readonly prisma: PrismaService) { }
  async create(createAlbum: CreateAlbumDto, idUser: number) {
    const findUser = await this.findUser(idUser)
    return this.prisma.album.create({
      data: {
        name: createAlbum.name,
        isPublic: createAlbum.isPublic,
        user_id: findUser
      }
    })
  }

  async findAll(idUser: number, { limit = 0, page = 10 }: AlbumPaginationDto) {
    const findUser = await this.findUser(idUser)

    return this.prisma.album.findMany({
      where: {
        user_id: findUser
      },
      skip: page, take: limit
    });
  }

  async findOne(id: number) {
    const findAlbum = await this.findAlbum(id)
    return this.prisma.album.findUniqueOrThrow({ where: { id: findAlbum } })
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const findAlbum = await this.findAlbum(id)
    return this.prisma.album.update({
      where: { id: findAlbum }, data: {
        name: updateAlbumDto.name,
        isPublic: updateAlbumDto.isPublic
      }
    });
  }

  async remove(id: number) {
    const findAlbum = await this.findAlbum(id)
    return this.prisma.album.delete({
      where: {
        id: findAlbum
      }
    })
  }

  private async findUser(idUser: number) {
    const getUser = await this.prisma.user.findUnique({
      where: { id: idUser }, omit: {
        email: true, password: true
      }
    });
    if (!getUser) {
      throw new NotFoundException("Not found user")
    }
    return getUser.id
  }
  private async findAlbum(idUser: number) {
    const getAlbum = await this.prisma.album.findUnique({ where: { id: idUser }, omit: { name: true, isPublic: true, user_id: true } });
    if (!getAlbum) {
      throw new NotFoundException("Not found album")
    }
    return getAlbum.id
  }
}
