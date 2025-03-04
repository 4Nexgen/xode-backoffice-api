import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { NewsArticleService } from './news_article.service';
import { CreateNewsArticleDto } from './dto/create-news_article.dto';
import { UpdateNewsArticleDto } from './dto/update-news_article.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('news-article')
export class NewsArticleController {
  constructor(private readonly newsArticleService: NewsArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create News Article' })
  create(@Body() createNewsArticleDto: CreateNewsArticleDto) {
    try {
      const createNewsArticle =
        this.newsArticleService.create(createNewsArticleDto);
      return createNewsArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get All News Article' })
  findAll() {
    try {
      const newsArticles = this.newsArticleService.findAll();
      return newsArticles;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get News Article' })
  findOne(@Param('id') id: string) {
    try {
      const newsArticle = this.newsArticleService.findOne(id);
      return newsArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update News Article' })
  update(
    @Param('id') id: string,
    @Body() updateNewsArticleDto: UpdateNewsArticleDto,
  ) {
    try {
      const updateNewsArticle = this.newsArticleService.update(
        id,
        updateNewsArticleDto,
      );
      return updateNewsArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Blog' })
  delete(@Param('id') id: string) {
    try {
      const deleteNewsArticle = this.newsArticleService.remove(id);
      return deleteNewsArticle;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }
}
