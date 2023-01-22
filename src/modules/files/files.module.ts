import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { FilesRepository } from './repository/files.repository';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  imports: [ConfigModule],
})
export class FilesModule {}
