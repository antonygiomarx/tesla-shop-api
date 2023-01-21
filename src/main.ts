import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('NestApplication');

export class NestApplication {
  public static port = process.env.PORT || 3000;

  static async start() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors();

    app.setGlobalPrefix('api');

    await app.listen(this.port);
  }
}

NestApplication.start()
  .then(() => {
    logger.log(`Application listening on port ${NestApplication.port}`);
  })
  .catch((error) => {
    logger.error(error);
  });
