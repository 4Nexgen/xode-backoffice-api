import { Module } from '@nestjs/common';
import { BountiesService } from './bounties.service';
import { BountiesController } from './bounties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bounty, BountySchema } from './entities/bounty.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bounty.name, schema: BountySchema}]),
],
  controllers: [BountiesController],
  providers: [BountiesService],
})
export class BountiesModule {}
