import { UserRepository } from "../../../data/repositories/user.repository";
import { BadRequestError, NotFoundError } from "../../../models/errors";
import { generateAccessToken } from "../../../utils/generateTokens";
import { isPasswordMath } from "../../../utils/hashPassword";
import { loginValidationSchema } from "./login.validation";

type LoginProps = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

type LoginResult = Promise<BadRequestError | NotFoundError | LoginResponse>;

export class LoginService {
  constructor(private _userRepository = new UserRepository()) {}

  login = async (props: LoginProps): LoginResult => {
    const validationResult = this._isParamsValid(props);

    if (validationResult !== undefined) {
      return new BadRequestError(validationResult?.message);
    }

    const user = await this._userRepository.getUserByEmail(props.email);

    const isPasswordValid = await isPasswordMath(
      props.password,
      user?.password || ""
    );

    if (user == null || user.email !== props.email || !isPasswordValid) {
      return new BadRequestError("email or password invalid");
    }

    const token = generateAccessToken({
      email: user.email,
      role: "admin",
      id: user.id,
    });

    return {
      token: token,
    };
  };

  private _isParamsValid(props: LoginProps) {
    const validationResult = loginValidationSchema.validate(props);
    return validationResult.error;
  }
}
