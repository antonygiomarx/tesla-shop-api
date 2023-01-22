import {
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { VersionUtil } from '../../util/version.util';

export type DefaultSwaggerConfig = Omit<OpenAPIObject, 'paths'>;

export enum Tag {
  AUTH = 'Auth',
  USERS = 'Users',
  PRODUCTS = 'Products',
  SEED = 'Seed',
  FILES = 'Files',
}

export class SwaggerStrategy {
  static config(): DefaultSwaggerConfig {
    return {
      openapi: '3.0.0',
      info: {
        title: 'Tesla API',
        version: VersionUtil.version,
        description:
          '' +
          'Tesla API is a RESTful API for Tesla cars. ' +
          '' +
          'It is built with NestJS and TypeORM. ',
      },
      tags: [
        {
          name: 'Auth',
          description: 'Auth related endpoints',
        },
        {
          name: 'Users',
          description: 'Users related endpoints',
        },
        {
          name: 'Products',
          description: 'Products related endpoints',
        },
        {
          name: 'Seed',
          description: 'Seed related endpoints',
        },
        {
          name: 'Files',
          description: 'Files related endpoints',
        },
      ],
    };
  }

  static options(): SwaggerDocumentOptions {
    return {
      ignoreGlobalPrefix: true,
    };
  }

  static setup(app: INestApplication) {
    const swaggerConfig = SwaggerStrategy.config();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  public createDocument(app: INestApplication) {
    return SwaggerModule.createDocument(
      app,
      SwaggerStrategy.config(),
      SwaggerStrategy.options(),
    );
  }
}
