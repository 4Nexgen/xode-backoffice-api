import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsArticleDto } from './dto/create-news_article.dto';
import { UpdateNewsArticleDto } from './dto/update-news_article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NewsArticle } from './entities/news_article.entity';
import { Model } from 'mongoose';

@Injectable()
export class NewsArticleService {
  constructor(
    @InjectModel(NewsArticle.name)
    private readonly newsArticleModel: Model<NewsArticle>,
  ) {}
  async create(
    createNewsArticleDto: CreateNewsArticleDto,
  ): Promise<NewsArticle> {
    try {
      const { title, content, createdDate } = createNewsArticleDto;
      const newsAritcle = await this.newsArticleModel.create({
        title,
        content,
        createdDate,
      });

      return newsAritcle;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<NewsArticle[]> {
    try {
      const newsAritcles = await this.newsArticleModel.find().exec();
      return newsAritcles;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<NewsArticle> {
    try {
      const newsAritcle = await this.newsArticleModel.findById(id).exec();

      if (!newsAritcle) {
        throw new NotFoundException('News not found');
      }

      return newsAritcle;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateNewsArticleDto: UpdateNewsArticleDto,
  ): Promise<NewsArticle> {
    try {
      const newsAritcle = await this.newsArticleModel.findById(id).exec();

      if (!newsAritcle) {
        throw new NotFoundException('News not found');
      }

      const updatednewsAritcle = this.newsArticleModel
        .findByIdAndUpdate(id, updateNewsArticleDto, { new: true })
        .exec();

      return updatednewsAritcle;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const newsAritcle = await this.newsArticleModel.findById(id).exec();

      if (!newsAritcle) {
        throw new NotFoundException('News not found');
      }

      await this.newsArticleModel.findByIdAndDelete(id).exec();

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
