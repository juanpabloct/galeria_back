import { Test, TestingModule } from '@nestjs/testing';
import { AlbumWithImagesController } from './album-with-images.controller';
import { AlbumWithImagesService } from './album-with-images.service';

describe('AlbumWithImagesController', () => {
  let controller: AlbumWithImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumWithImagesController],
      providers: [AlbumWithImagesService],
    }).compile();

    controller = module.get<AlbumWithImagesController>(AlbumWithImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
