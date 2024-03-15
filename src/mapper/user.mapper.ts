import { UserDb } from "../data/models/user";
import { RegisterSuccess } from "../features/auth/auth.models";

export class UserMapper {
  dbUserToRegisterResponse = (user: UserDb): RegisterSuccess => ({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}
