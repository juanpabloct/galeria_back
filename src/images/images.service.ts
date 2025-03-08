import { Injectable } from '@nestjs/common';
import { CreateImageDto, CreateParamsImage } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { AlbumPaginationDto } from 'src/album/dto/pagination-album.dto';

@Injectable()
export class ImagesService {
  constructor(readonly prisma: PrismaService) { }
  async create(createImage: CreateImageDto, params: CreateParamsImage) {
    const getAlbum = await this.prisma.album.findUniqueOrThrow({ where: { id: params.album_id, user_id: params.user_id } });
    const uploadImage = await this.prisma.images_user.create({
      data: {
        key_img: createImage.name_img,
        isPublic: createImage.isPublic,
        user_id: getAlbum.user_id
      }
    })
    const _ = await this.prisma.album_with_gallery.create({
      data: {
        album_id: getAlbum.id,
        user_id: params.user_id,
        gallery_id: uploadImage.id
      },
    });
    return { status: 200, message: "upload image successful" }
  }

  async findAll(userId: number, { limit = 0, page = 10 }: AlbumPaginationDto) {
    const findImagesUser = await this.prisma.images_user.findMany({
      where: { user_id: userId, },
      skip: page, take: limit
    })
    return findImagesUser
  }

  async findOne(idImage: number) {
    const findImagesUser = await this.prisma.images_user.findUniqueOrThrow({
      where: {
        id: idImage
      }
    })
    return findImagesUser

  }

  async update(idImage: number, updateImage: UpdateImageDto) {
    const findImagesUser = await this.prisma.images_user.update({
      where: {
        id: idImage
      },
      data: {
        key_img: updateImage.name_img,
        isPublic: updateImage.isPublic
      }
    })
    return findImagesUser
  }

  async remove(idImage: number) {
    const deleteImagesUser = await this.prisma.images_user.delete({
      where: {
        id: idImage
      }
    })
    return deleteImagesUser
  }
}
