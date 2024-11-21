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
  
  async create(createBountyDto: CreateBountyDto): Promise<Bounty> {
    const newBounty = new this.bountyModel(createBountyDto);
    return newBounty.save();
  }

  async findAll(): Promise<Bounty[]> {
    return this.bountyModel.find().exec(); 
  }

  async findOne(id: string): Promise<Bounty> {
    const bounty = await this.bountyModel.findById(id).exec();

    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    return bounty;
  }

  async update(id: string, updateBountyDto: UpdateBountyDto): Promise<Bounty> {
    const updatedBounty = await this.bountyModel
      .findByIdAndUpdate(id, updateBountyDto, { new: true })
      .exec(); 

    if (!updatedBounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    return updatedBounty;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedBounty = await this.bountyModel.findByIdAndDelete(id).exec();
    
    if (!deletedBounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }

    return { message: `Bounty with ID ${id} has been deleted successfully` };
  }
}
