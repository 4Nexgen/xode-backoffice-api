import { PartialType } from '@nestjs/swagger';
import { CreateNewsArticleDto } from './create-news_article.dto';

export class UpdateNewsArticleDto extends PartialType(CreateNewsArticleDto) {}
