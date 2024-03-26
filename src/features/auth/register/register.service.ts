import { UserRepository } from "../../../data/repositories/user.repository";
import { UserMapper } from "../../../mapper/user.mapper";
import { BadRequestError } from "../../../models/errors";
import { hashPassword } from "../../../utils/hashPassword";
import { RegisterSuccess } from "../auth.models";
import { registerValidationSchema } from "./register.validation";

type RegisterUserProps = {
  email: string;
  password: string;
};

export class RegisterService {
  constructor(
    private _userRepository = new UserRepository(),
    private _userMapper = new UserMapper()
  ) {}

  registerUser = async (
    props: RegisterUserProps
  ): Promise<BadRequestError | RegisterSuccess> => {
    const validationResult = this._isParamsValid(props);

    if (validationResult !== undefined) {
      return new BadRequestError(validationResult?.message);
    }

    const hashedPassword = await hashPassword(props.password);

    const user = await this._userRepository.addUser({
      email: props.email,
      password: hashedPassword,
      role: "admin",
    });

    return this._userMapper.dbUserToRegisterResponse(user);
  };

  _isParamsValid(props: RegisterUserProps) {
    const validationResult = registerValidationSchema.validate(props);
    return validationResult.error;
  }
}
