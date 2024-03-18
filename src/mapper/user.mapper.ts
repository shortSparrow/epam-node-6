import { UserDbI } from "../data/models/user";
import { RegisterSuccess } from "../features/auth/auth.models";

export class UserMapper {
  dbUserToRegisterResponse = (user: UserDbI): RegisterSuccess => ({
    id: user._id,
    email: user.email,
    role: user.role,
  });
}
