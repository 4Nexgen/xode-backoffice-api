import { Module } from '@nestjs/common';
import { NewsArticleService } from './news_article.service';
import { NewsArticleController } from './news_article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsArticle, NewsArticleSchema } from './entities/news_article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsArticle.name, schema: NewsArticleSchema },
    ]),
  ],
  controllers: [NewsArticleController],
  providers: [NewsArticleService],
})
export class NewsArticleModule {}
