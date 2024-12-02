import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from './entities/status.entity';
import { Model } from 'mongoose';

@Injectable()
export class StatusesService {
  constructor(
    @InjectModel(Status.name)
    private readonly statusModel: Model<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    const statuses = await this.statusModel.find().exec();
    return statuses;
  }

  async findOne(id: string): Promise<Status> {
    const status = await this.statusModel.findById(id).exec();

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const { status, type } = createStatusDto;
    const newStatus = await this.statusModel.create({
      status,
      type,
    });

    return newStatus;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusModel.findById(id).exec();

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const updatedStatus = this.statusModel
      .findByIdAndUpdate(id, updateStatusDto, { new: true })
      .exec();

    return updatedStatus;
  }

  async remove(id: string): Promise<boolean> {
    const status = await this.statusModel.findById(id).exec();

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    await this.statusModel.findByIdAndDelete(id).exec();

    return true;
  }
}
