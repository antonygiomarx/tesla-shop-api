import { User } from '../../users/entities';

export class GetRandomUserUtil {
  static getRandomUser(users: User[]): User {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }
}
