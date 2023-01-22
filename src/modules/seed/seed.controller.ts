import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Role } from '../auth/interfaces';
import { Auth, CurrentUser } from '../auth/decorators';
import { User } from '../users/entities';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(Role.ADMIN, Role.USER)
  run(@CurrentUser() user: User) {
    return this.seedService.run(user);
  }
}
