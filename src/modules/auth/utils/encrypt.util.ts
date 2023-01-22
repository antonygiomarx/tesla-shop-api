import { compare, genSalt, hash } from 'bcrypt';

export class EncryptUtil {
  static async encrypt(value: string, saltRounds = 10): Promise<string> {
    const salt = await genSalt(saltRounds);

    return await hash(value, salt);
  }

  static async compare(
    value: string,
    encryptedValue: string,
  ): Promise<boolean> {
    return await compare(value, encryptedValue);
  }
}
