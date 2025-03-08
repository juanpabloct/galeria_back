import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumWithImageDto } from './create-album-with-image.dto';

export class UpdateAlbumWithImageDto extends PartialType(CreateAlbumWithImageDto) {}
