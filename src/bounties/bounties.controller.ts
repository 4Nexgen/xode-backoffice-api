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
import { BountiesService } from './bounties.service';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('bounties')
export class BountiesController {
  constructor(private readonly bountiesService: BountiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Bounties' })
  findAll() {
    const bounties = this.bountiesService.findAll();
    return bounties;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Bounty' })
  findOne(@Param('id') id: string) {
    const bounty = this.bountiesService.findOne(id);
    return bounty;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Bounty' })
  create(@Body() createBountyDto: CreateBountyDto) {
    const createBounty = this.bountiesService.create(createBountyDto);
    return createBounty;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Bounty' })
  update(@Param('id') id: string, @Body() updateBountyDto: UpdateBountyDto) {
    const updateBounty = this.bountiesService.update(id, updateBountyDto);
    return updateBounty;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Bounty' })
  delete(@Param('id') id: string) {
    const deleteBounty = this.bountiesService.delete(id);
    return deleteBounty;
  }
}
