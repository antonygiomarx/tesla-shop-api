import { BadRequestException, Logger } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as fs from 'fs';

export class FileFilterHelper {
  static storage = diskStorage({
    destination: (req, file, callback) => {
      const path = `${this.staticPath}/${this.uploadPath}`;

      if (!fs.existsSync(path)) {
        this.logger.warn(`Creating directory: ${path}`);

        if (!fs.existsSync(this.staticPath)) fs.mkdirSync(this.staticPath);

        fs.mkdirSync(path);
      }

      callback(null, path);
    },
    filename: (req, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`;

      callback(null, filename);
    },
  });
  private static staticPath = 'static';
  private static uploadPath = 'uploads';
  private static logger = new Logger(FileFilterHelper.name);

  static imageFilter(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new BadRequestException('Only jpg, png, and gif files are allowed'),
        false,
      );
    }

    callback(null, true);
  }
}
