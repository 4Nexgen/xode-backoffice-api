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
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Status' })
  create(@Body() createStatusDto: CreateStatusDto) {
    const createStatus = this.statusesService.create(createStatusDto);
    return createStatus;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all Statuses' })
  findAll() {
    const statuses = this.statusesService.findAll();
    return statuses;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Status' })
  findOne(@Param('id') id: string) {
    const status = this.statusesService.findOne(id);
    return status;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Status' })
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    const updateStatus = this.statusesService.update(id, updateStatusDto);
    return updateStatus;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete Status' })
  delete(@Param('id') id: string) {
    const deleteStatus = this.statusesService.remove(id);
    return deleteStatus;
  }
}
