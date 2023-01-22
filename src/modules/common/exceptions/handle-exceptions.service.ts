import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class HandleExceptionsService {
  private logger = new Logger();

  handleDatabaseError(error: any, name?: string) {
    if (name) this.logger = new Logger(name);

    switch (error.code) {
      case '23505':
        this.logger.error(error.detail);
        throw new BadRequestException(error.detail);

      case '23503':
        this.logger.error(error.detail);
        throw new BadRequestException(error.detail);

      default:
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Something went wrong. Please try again later',
        );
    }
  }
}
