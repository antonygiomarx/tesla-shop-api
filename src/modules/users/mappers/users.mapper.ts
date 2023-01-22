import { User } from '../entities';

export class UsersMapper {
  static map(user: User): UsersMapper {
    const { id, name, email } = user;

    return {
      id,
      name,
      email,
    };
  }
}
