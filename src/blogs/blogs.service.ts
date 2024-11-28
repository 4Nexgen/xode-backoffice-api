import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      const {
        title,
        subTitle,
        author,
        featureImage,
        content,
        category,
        isPublished,
        publishedDate,
      } = createBlogDto;
      const newBlog = await this.blogModel.create({
        title,
        subTitle,
        author,
        featureImage,
        content,
        category,
        isPublished,
        publishedDate,
      });

      return newBlog;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Blog[]> {
    try {
      const blogs = await this.blogModel.find().exec();
      return blogs;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Blog> {
    try {
      const blog = await this.blogModel.findById(id).exec();

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }

      return blog;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    try {
      const blog = await this.blogModel.findById(id).exec();

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }

      const updatedBlog = this.blogModel
        .findByIdAndUpdate(id, updateBlogDto, { new: true })
        .exec();

      return updatedBlog;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const blog = await this.blogModel.findById(id).exec();

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }

      await this.blogModel.findByIdAndDelete(id).exec();

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
