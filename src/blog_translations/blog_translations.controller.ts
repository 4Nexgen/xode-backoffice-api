import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogTranslationsService } from './blog_translations.service';
import { CreateBlogTranslationDto } from './dto/create-blog_translation.dto';
import { UpdateBlogTranslationDto } from './dto/update-blog_translation.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('blog-translations')
export class BlogTranslationsController {
  constructor(
    private readonly blogTranslationsService: BlogTranslationsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Blog Translations' })
  findAll() {
    const blogTranslations = this.blogTranslationsService.findAll();
    return blogTranslations;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Blog Translation' })
  findOne(@Param('id') id: string) {
    const blogTranslation = this.blogTranslationsService.findOne(id);
    return blogTranslation;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Blog Translation' })
  create(@Body() createBlogTranslationDto: CreateBlogTranslationDto) {
    const createBlogTranslation = this.blogTranslationsService.create(
      createBlogTranslationDto,
    );
    return createBlogTranslation;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Blog Translation' })
  update(
    @Param('id') id: string,
    @Body() updateBlogTranslationDto: UpdateBlogTranslationDto,
  ) {
    const updateBlogTranslation = this.blogTranslationsService.update(
      id,
      updateBlogTranslationDto,
    );
    return updateBlogTranslation;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Blog Translation' })
  delete(@Param('id') id: string) {
    const deleteBlogTranslation = this.blogTranslationsService.remove(id);
    return deleteBlogTranslation;
  }
}
