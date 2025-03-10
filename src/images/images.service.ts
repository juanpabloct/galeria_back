import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto, CreateParamsImage } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { AlbumPaginationDto } from 'src/album/dto/pagination-album.dto';
import { Bucket } from 'src/utils/bucket/bucketActions';
import { replaceAccents } from 'src/utils/replaceAccents';

@Injectable()
export class ImagesService {
  constructor(readonly prisma: PrismaService) { }
  async create(createImage: CreateImageDto, params: CreateParamsImage, { bucket, file }: { bucket: Bucket, file: Express.Multer.File },) {
    const getAlbum = await this.prisma.album.findUnique({ where: { id: params.album_id, user_id: params.user_id } });
    const keyName = replaceAccents(file.originalname.replaceAll(" ", "_"))
    const keyFile = `${getAlbum.user_id}/${getAlbum.id}/${keyName.toLowerCase()}`
    const _putImage = await bucket.pubObject({ contentType: file.mimetype, key: keyFile, img: file.buffer });
    if (!getAlbum) {

      throw new NotFoundException('Not found album');
    }

    const uploadImage = await this.prisma.images_user.create({
      data: {
        key_img: keyFile,
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

  async findAll(userId: number, bucket: Bucket, params: AlbumPaginationDto = { limit: 10, page: 1 }) {
    const findImageId = await this.prisma.user.findUnique({ where: { id: userId }, })
    if (!findImageId) {
      throw new NotFoundException('Not found user');
    }
    const findImagesUser = await this.prisma.images_user.findMany({
      where: { user_id: +userId, },
      skip: params.page, take: params.limit
    })

    const generateUrlImages = await Promise.all(findImagesUser.map(async (value) => ({
      id: value.id,
      isPublic: value.isPublic,
      userId: value.user_id,
      img: await bucket.getSignedImageUrl(value.key_img)
    })))
    return generateUrlImages
  }

  async findOne(idImage: number, bucket: Bucket) {
    const findImagesUser = await this.prisma.images_user.findUnique({
      where: {
        id: idImage
      }
    })

    if (!findImagesUser) {
      throw new NotFoundException('Image not found');
    }

    const infoImg = {
      id: findImagesUser.id,
      isPublic: findImagesUser.isPublic,
      userId: findImagesUser.user_id,
      img: await bucket.getSignedImageUrl(findImagesUser.key_img)
    }
    return infoImg
  }

  async update(idImage: number, updateImage: UpdateImageDto, { bucket, file }: { bucket: Bucket, file: Express.Multer.File }) {
    const findImage = await this.findImageId(idImage)
    const _updateImage = await bucket.pubObject({ contentType: file.mimetype, key: findImage.key_img, img: file.buffer });

    const findImagesUser = await this.prisma.images_user.update({
      where: {
        id: findImage.id
      },
      data: {
        key_img: findImage.key_img,
        isPublic: updateImage.isPublic
      }
    })
    return findImagesUser
  }

  async remove(idImage: number, { bucket }: { bucket: Bucket }) {
    const findImageId = await this.findImageId(idImage)
    await bucket.deleteObject({ key: findImageId.key_img })
    const deleteImagesUser = await this.prisma.images_user.delete({
      where: {
        id: findImageId.id
      }
    })
    return deleteImagesUser
  }
  private async findImageId(idImage: number) {
    const findImage = await this.prisma.images_user.findUnique({ where: { id: idImage } })
    if (!findImage) {
      throw new NotFoundException("not found image")
    }
    return findImage
  }
}
