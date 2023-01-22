import { SetMetadata } from '@nestjs/common';
import { Role as AvailableRole, ROLES_METADATA_KEY } from '../interfaces';

export const Role = (...args: AvailableRole[]) => {
  return SetMetadata(ROLES_METADATA_KEY, args);
};
