import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Role } from '../auth/interfaces';
import { Auth, CurrentUser } from '../auth/decorators';
import { User } from '../users/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from '../docs/strategies/swagger.strategy';

@ApiTags(Tag.SEED)
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({
    status: 200,
    description: 'Seed database with test data.',
  })
  @Get()
  @Auth(Role.ADMIN, Role.USER)
  run(@CurrentUser() user: User) {
    return this.seedService.run(user);
  }
}
