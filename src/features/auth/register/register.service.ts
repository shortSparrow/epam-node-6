import { AuthRepository } from "../../../data/repositories/auth.repository";
import { BadRequestError } from "../../../models/errors";
import { registerValidationSchema } from "./register.validation";

type RegisterUserProps = {
  email: string;
  password: string;
};

type Success = {
  id: string;
  email: string;
  role: string;
};

export class RegisterService {
  constructor(private _authRepository = new AuthRepository()) {}

  registerUser = async (
    props: RegisterUserProps
  ): Promise<BadRequestError | Success> => {
    const validationResult = this._isParamsValid(props);

    if (validationResult !== undefined) {
      return new BadRequestError(validationResult?.message);
    }

    const user = await this._authRepository.addUser({
      email: props.email,
      password: props.password,
      role: "admin",
    });

    return {
      id: user.id,
      email: user.email,
      role: "admin",
    };
  };

  _isParamsValid(props: RegisterUserProps) {
    const validationResult = registerValidationSchema.validate(props);
    return validationResult.error;
  }
}
