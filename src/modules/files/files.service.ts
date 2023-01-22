import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { FilesRepository } from './repository/files.repository';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesRepository: FilesRepository,
  ) {}

  create(file: Express.Multer.File) {
    return this.filesRepository.create(file);
  }

  serveFile(filename: string) {
    const path = join(__dirname, '..', '..', 'static', 'uploads', filename);

    if (!fs.existsSync(path)) {
      throw new NotFoundException('File not found');
    }

    return path;
  }
}
