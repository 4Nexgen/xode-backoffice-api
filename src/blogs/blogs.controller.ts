import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Blog' })
  create(@Body() createBlogDto: CreateBlogDto) {
    try {
      const createBlog = this.blogsService.create(createBlogDto);
      return createBlog;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get All Blogs' })
  findAll() {
    try {
      const blogs = this.blogsService.findAll();
      return blogs;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Blog' })
  findOne(@Param('id') id: string) {
    try {
      const blog = this.blogsService.findOne(id);
      return blog;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Blog' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const updateBlog = this.blogsService.update(id, updateBlogDto);
      return updateBlog;
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
      const deleteBlog = this.blogsService.remove(id);
      return deleteBlog;
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Internal Server Error: ${error.message}`,
        data: null,
      });
    }
  }
}
