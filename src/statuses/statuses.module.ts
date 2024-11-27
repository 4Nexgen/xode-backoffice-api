import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './entities/status.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
