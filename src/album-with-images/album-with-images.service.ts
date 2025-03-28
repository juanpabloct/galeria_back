import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumWithImagesService {
  constructor(readonly prisma: PrismaService) { }
  async findAll({ albumId, userId }: { albumId: number, userId: number }) {
    const findAlbum = await this.findAlbum(albumId)
    const findUser = await this.findUser(userId)
    const getImagesAlbum = await this.prisma.album_with_gallery.findMany({
      where: {
        album_id: findAlbum, user_id: findUser,
      },
      select: {
        images: true
      }
    });

    return getImagesAlbum;
  }


  private async findUser(userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    })
    if (!findUser) {
      throw new NotFoundException("Not found user")
    }
    return findUser.id
  }
  private async findAlbum(albumId: number) {
    const getAlbum = await this.prisma.album.findUnique({
      where: {
        id: albumId
      },
      select: {
        id: true
      }
    })
    if (!getAlbum) {
      throw new NotFoundException("Not found album")
    }
    return getAlbum.id
  }

}
