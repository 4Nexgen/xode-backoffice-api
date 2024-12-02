import { Test, TestingModule } from '@nestjs/testing';
import { BlogTranslationsService } from './blog_translations.service';

describe('BlogTranslationsService', () => {
  let service: BlogTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogTranslationsService],
    }).compile();

    service = module.get<BlogTranslationsService>(BlogTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
