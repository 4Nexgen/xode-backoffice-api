import { Module } from '@nestjs/common';
import { BlogTranslationsService } from './blog_translations.service';
import { BlogTranslationsController } from './blog_translations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlogTranslation,
  BlogTranslationSchema,
} from './entities/blog_translation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogTranslation.name, schema: BlogTranslationSchema },
    ]),
  ],
  controllers: [BlogTranslationsController],
  providers: [BlogTranslationsService],
})
export class BlogTranslationsModule {}
