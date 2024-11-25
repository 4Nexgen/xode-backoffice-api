import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bounty } from './entities/bounty.entity';
import { Model } from 'mongoose';

@Injectable()
export class BountiesService {
  constructor(
    @InjectModel(Bounty.name)
    private readonly bountyModel: Model<Bounty>,
  ) {}

  async findAll(): Promise<Bounty[]> {
    const bounties = await this.bountyModel.find().exec();
    return bounties;
  }

  async findOne(id: string): Promise<Bounty> {
    const bounty = await this.bountyModel.findById(id).exec();

    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }

    return bounty;
  }

  async create(createBountyDto: CreateBountyDto): Promise<Bounty> {
    const {
      date,
      category,
      title,
      description,
      specification,
      bounty_price,
      status,
      github_issue_url,
    } = createBountyDto;
    const newBounty = await this.bountyModel.create({
      date,
      category,
      title,
      description,
      specification,
      bounty_price,
      status,
      github_issue_url,
    });

    return newBounty;
  }

  async update(id: string, updateBountyDto: UpdateBountyDto): Promise<Bounty> {
    const bounty = await this.bountyModel.findById(id).exec();

    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }

    const updatedBounty = this.bountyModel
      .findByIdAndUpdate(id, updateBountyDto, { new: true })
      .exec();

    return updatedBounty;
  }

  async delete(id: string): Promise<boolean> {
    const bounty = await this.bountyModel.findById(id).exec();

    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }

    await this.bountyModel.findByIdAndDelete(id).exec();

    return true;
  }
}
