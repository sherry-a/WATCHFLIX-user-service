import { IUser } from 'src/modules/User/user.dto';
export function excludeUserField<User, Key extends keyof User>(
  user: IUser,
  keys: Key[],
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<User, Key>;
}
