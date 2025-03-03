import { Test, TestingModule } from '@nestjs/testing';
import { NewsArticleController } from './news_article.controller';
import { NewsArticleService } from './news_article.service';

describe('NewsArticleController', () => {
  let controller: NewsArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsArticleController],
      providers: [NewsArticleService],
    }).compile();

    controller = module.get<NewsArticleController>(NewsArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
