import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BountiesService } from './bounties.service';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bounties')

export class BountiesController {
  constructor(private readonly bountiesService: BountiesService) {}

  @Post('/create_bounty')
  @UseGuards(AuthGuard())
  create(@Body() createBountyDto: CreateBountyDto) {
    return this.bountiesService.create(createBountyDto);
  }

  @Get()
  async findAll() {
    return this.bountiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bountiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() updateBountyDto: UpdateBountyDto) {
    return this.bountiesService.update(id, updateBountyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: string) {
    return this.bountiesService.delete(id);
  }
}
