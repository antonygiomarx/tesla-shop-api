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

  static from(keys: (keyof User)[], user: User): Partial<User> {
    return keys.reduce((acc, key) => {
      if (user[key]) {
        (<string>acc[key]) = user[key] as string;
      }

      return acc;
    }, {} as User);
  }
}
