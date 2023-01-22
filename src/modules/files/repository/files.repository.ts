import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesRepository {
  constructor(private readonly configService: ConfigService) {}

  create(file: Express.Multer.File) {
    const url = `${this.configService.get('HOST')}/files/product/${
      file.filename
    }`;

    return { url };
  }
}
