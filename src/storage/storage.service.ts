import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly STORAGE_PATH = path.join(
    process.cwd(),
    process.env.STORAGE_PATH,
  );

  private readonly fileTypeMap: Record<string, string> = {
    '.jpg': 'images',
    '.jpeg': 'images',
    '.png': 'images',
    '.svg': 'images',
    '.pdf': 'documents',
    default: 'others',
  };

  private readonly mediaTypesMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml',
    default: 'application/octet-stream',
  };

  getFile(fileName: string): { filePath: string; mimeType: string } {
    const fileExtension = path.extname(fileName).toLowerCase();
    const folderName =
      this.fileTypeMap[fileExtension] || this.fileTypeMap['default'];
    const filePath = path.join(this.STORAGE_PATH, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File ${fileName} not found`);
    }

    const mimeType =
      this.mediaTypesMap[fileExtension] || this.mediaTypesMap['default'];

    return { filePath, mimeType };
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ fileName: string; fileUrl: string; fileLocalPath: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const tempFilePath = file.path;
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const folderName =
      this.fileTypeMap[fileExtension] || this.fileTypeMap['default'];
    const storagePath = path.join(this.STORAGE_PATH, folderName);

    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }

    const filePath = path.join(storagePath, file.originalname);

    fs.renameSync(tempFilePath, filePath);

    const fileUrl = `/storage/${folderName}/${file.originalname}`;

    return {
      fileName: file.originalname,
      fileUrl: fileUrl,
      fileLocalPath: filePath,
    };
  }
}
