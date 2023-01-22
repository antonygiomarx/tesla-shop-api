import {
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFilterHelper } from './helpers/file-filter.helper';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilterHelper.imageFilter,
      storage: FileFilterHelper.storage,
    }),
  )
  create(@UploadedFile(ParseFilePipe) file: Express.Multer.File) {
    return this.filesService.create(file);
  }

  @Get('product/:filename')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilterHelper.imageFilter,
      storage: FileFilterHelper.storage,
    }),
  )
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = this.filesService.serveFile(filename);

    return res.sendFile(file);
  }
}
