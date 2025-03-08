import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto, CreateParamsImage } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { AlbumPaginationDto } from 'src/album/dto/pagination-album.dto';
import { Bucket } from 'src/utils/bucket/bucketActions';

@Injectable()
export class ImagesService {
  constructor(readonly prisma: PrismaService) { }
  async create(createImage: CreateImageDto, params: CreateParamsImage, bucket: Bucket) {
    const getAlbum = await this.prisma.album.findUnique({ where: { id: params.album_id, user_id: params.user_id } });
    // const putImage = await bucket.pubObject({ contentType: "", key: "", img: "" });
    if (!getAlbum) {

      throw new NotFoundException('Not found album');
    }
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

  async findAll(userId: number, params: AlbumPaginationDto = { limit: 10, page: 1 }) {
    const findImageId = await this.prisma.user.findUnique({ where: { id: userId }, })
    if (!findImageId) {
      throw new NotFoundException('Not found user');
    }
    const findImagesUser = await this.prisma.images_user.findMany({
      where: { user_id: +userId, },
      skip: params.page, take: params.limit
    })
    return findImagesUser
  }

  async findOne(idImage: number) {
    const findImagesUser = await this.prisma.images_user.findUnique({
      where: {
        id: idImage
      }
    })

    if (!findImagesUser) {
      throw new NotFoundException('Image not found');
    }
    return findImagesUser
  }

  async update(idImage: number, updateImage: UpdateImageDto) {
    const findImage = await this.findImageId(idImage)

    const findImagesUser = await this.prisma.images_user.update({
      where: {
        id: findImage.id
      },
      data: {
        key_img: updateImage.name_img,
        isPublic: updateImage.isPublic
      }
    })
    return findImagesUser
  }

  async remove(idImage: number) {
    const findImageId = await this.findImageId(idImage)
    const deleteImagesUser = await this.prisma.images_user.delete({
      where: {
        id: findImageId.id
      }
    })
    return deleteImagesUser
  }
  private async findImageId(idImage: number) {
    const findImage = await this.prisma.images_user.findUnique({ where: { id: idImage }, select: { id: true } })
    if (!findImage) {
      throw new NotFoundException("not found image")
    }
    return findImage
  }
}
