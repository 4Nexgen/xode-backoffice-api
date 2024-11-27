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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Category' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoriesService.create(createCategoryDto);
    return createCategory;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all Categories' })
  findAll() {
    const categories = this.categoriesService.findAll();
    return categories;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Category' })
  findOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(id);
    return category;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Category' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updateCategory = this.categoriesService.update(id, updateCategoryDto);
    return updateCategory;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Category' })
  delete(@Param('id') id: string) {
    const deleteCategory = this.categoriesService.remove(id);
    return deleteCategory;
  }
}
