import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { Role } from '../interfaces';
import { Role as RoleDecorator } from './role.decorator';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    RoleDecorator(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
