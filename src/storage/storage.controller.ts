import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Request,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import * as fs from 'fs';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const { filePath, mimeType } = this.storageService.getFile(fileName);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }

  @Post('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() request: ExpressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}`;

    const uploadFile = await this.storageService.uploadFile(file);

    const fileUrl = `${baseUrl}/storage/${uploadFile.fileName}`;

    return {
      fileName: uploadFile.fileName,
      fileUrl: fileUrl,
      fileLocalPath: uploadFile.fileLocalPath,
    };
  }
}
