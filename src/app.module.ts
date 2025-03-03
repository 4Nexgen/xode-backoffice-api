import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BountiesModule } from './bounties/bounties.module';
import { CategoriesModule } from './categories/categories.module';
import { StatusesModule } from './statuses/statuses.module';
import { BlogsModule } from './blogs/blogs.module';
import { StorageModule } from './storage/storage.module';
import { BlogTranslationsModule } from './blog_translations/blog_translations.module';
import { NewsArticleModule } from './news_article/news_article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URI, { dbName: process.env.DB_NAME }),

    AuthModule,
    UsersModule,
    BountiesModule,
    CategoriesModule,
    StatusesModule,
    BlogsModule,
    BlogTranslationsModule,
    StorageModule,
    NewsArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
