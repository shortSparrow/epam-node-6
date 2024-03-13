import { UserRepository } from "../../../data/repositories/user.repository";
import { BadRequestError, NotFoundError } from "../../../models/errors";
import { loginValidationSchema } from "./login.validation";

type LoginProps = {
  email: string;
  password: string;
};

type Success = {
  token: string;
};

type LoginResult = Promise<BadRequestError | NotFoundError | Success>;

export class LoginService {
  constructor(private _userRepository = new UserRepository()) {}

  login = async (props: LoginProps): LoginResult => {
    const validationResult = this._isParamsValid(props);

    if (validationResult !== undefined) {
      return new BadRequestError(validationResult?.message);
    }

    const user = await this._userRepository.getUserByEmail(props.email);

    if (
      user == null ||
      user.password !== props.password ||
      user.email !== props.email
    ) {
      return new BadRequestError("email or password invalid");
    }

    return {
      token: user?.token,
    };
  };

  private _isParamsValid(props: LoginProps) {
    const validationResult = loginValidationSchema.validate(props);
    return validationResult.error;
  }
}
