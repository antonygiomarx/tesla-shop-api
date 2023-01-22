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

  static from(keys: (keyof User)[], user: User): UsersMapper {
    return keys.reduce((acc, key) => {
      if (user[key]) {
        acc[key] = user[key];
      }

      return acc;
    }, {});
  }
}
