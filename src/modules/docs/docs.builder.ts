import { SwaggerStrategy } from './strategies/swagger.strategy';
import { INestApplication } from '@nestjs/common';

export class DocsBuilder {
  static setup(app: INestApplication) {
    const swaggerStrategy = SwaggerStrategy;
    return swaggerStrategy.setup(app);
  }
}
