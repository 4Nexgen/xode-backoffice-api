import { Test, TestingModule } from '@nestjs/testing';
import { BlogTranslationsController } from './blog_translations.controller';
import { BlogTranslationsService } from './blog_translations.service';

describe('BlogTranslationsController', () => {
  let controller: BlogTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogTranslationsController],
      providers: [BlogTranslationsService],
    }).compile();

    controller = module.get<BlogTranslationsController>(BlogTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
