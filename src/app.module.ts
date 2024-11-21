import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BountiesModule } from './bounties/bounties.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
