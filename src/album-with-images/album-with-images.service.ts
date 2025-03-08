import { Injectable } from '@nestjs/common';
import { CreateAlbumWithImageDto } from './dto/create-album-with-image.dto';
import { UpdateAlbumWithImageDto } from './dto/update-album-with-image.dto';

@Injectable()
export class AlbumWithImagesService {
  create(createAlbumWithImageDto: CreateAlbumWithImageDto) {
    return 'This action adds a new albumWithImage';
  }

  findAll() {
    return `This action returns all albumWithImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} albumWithImage`;
  }

  update(id: number, updateAlbumWithImageDto: UpdateAlbumWithImageDto) {
    return `This action updates a #${id} albumWithImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} albumWithImage`;
  }
}
