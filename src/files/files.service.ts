import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  create(file: Express.Multer.File) {
    const url = `${this.configService.get('HOST')}/files/product/${
      file.filename
    }`;

    return { url };
  }

  serveFile(filename: string) {
    const path = join(__dirname, '..', '..', 'static', 'uploads', filename);

    if (!fs.existsSync(path)) {
      throw new NotFoundException('File not found');
    }

    return path;
  }
}
