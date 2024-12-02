import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogTranslationDto } from './dto/create-blog_translation.dto';
import { UpdateBlogTranslationDto } from './dto/update-blog_translation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogTranslation } from './entities/blog_translation.entity';
import { Model } from 'mongoose';

@Injectable()
export class BlogTranslationsService {
  constructor(
    @InjectModel(BlogTranslation.name)
    private readonly blogTranslationModel: Model<BlogTranslation>,
  ) {}

  async findAll(): Promise<BlogTranslation[]> {
    const blogTranslations = await this.blogTranslationModel.find().exec();
    return blogTranslations;
  }

  async findOne(id: string): Promise<BlogTranslation> {
    const blogTranslation = await this.blogTranslationModel.findById(id).exec();

    if (!blogTranslation) {
      throw new NotFoundException('Blog translation not found');
    }

    return blogTranslation;
  }

  async create(
    createBlogTranslationDto: CreateBlogTranslationDto,
  ): Promise<BlogTranslation> {
    const { blogId, languageCode, translatedText } = createBlogTranslationDto;
    const newBlogTranslation = await this.blogTranslationModel.create({
      blogId,
      languageCode,
      translatedText,
    });

    return newBlogTranslation;
  }

  async update(
    id: string,
    updateBlogTranslationDto: UpdateBlogTranslationDto,
  ): Promise<BlogTranslation> {
    const blogTranslation = await this.blogTranslationModel.findById(id).exec();

    if (!blogTranslation) {
      throw new NotFoundException('Blog translation not found');
    }

    const updatedBlogTranslation = this.blogTranslationModel
      .findByIdAndUpdate(id, updateBlogTranslationDto, { new: true })
      .exec();

    return updatedBlogTranslation;
  }

  async remove(id: string): Promise<boolean> {
    const blogTranslation = await this.blogTranslationModel.findById(id).exec();

    if (!blogTranslation) {
      throw new NotFoundException('Blog translation not found');
    }

    await this.blogTranslationModel.findByIdAndDelete(id).exec();

    return true;
  }
}
