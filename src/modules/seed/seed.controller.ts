import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Role } from '../auth/interfaces';
import { Auth, User } from '../auth/decorators';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(Role.ADMIN, Role.USER)
  run(@User() user) {
    return this.seedService.run(user);
  }
}
