import { Test, TestingModule } from '@nestjs/testing';
import { AlbumWithImagesService } from './album-with-images.service';

describe('AlbumWithImagesService', () => {
  let service: AlbumWithImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumWithImagesService],
    }).compile();

    service = module.get<AlbumWithImagesService>(AlbumWithImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
