import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_METADATA_KEY } from '../../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
  private readonly logger = new Logger(UserRoleGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      ROLES_METADATA_KEY,
      context.getHandler(),
    );

    if (!roles || roles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;

    if (!user) {
      throw new BadRequestException(
        'User not found. Please check your request and try again.',
      );
    }

    if (!user.roles || user.roles.length === 0) {
      throw new BadRequestException(
        'User roles not found. Please check your request and try again.',
      );
    }

    const hasRole = () => user.roles.some((role) => roles.includes(role));

    if (!hasRole()) {
      this.logger.error(`User ${user.id} does not have the required role`);

      throw new BadRequestException(
        'You are not authorized to access this resource, only users with the following roles are allowed: ' +
          roles.join(', '),
      );
    }

    return true;
  }
}
