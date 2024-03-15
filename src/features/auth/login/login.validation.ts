import Joi from "joi";

export const loginValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .message("Password is not valid")
    .required(),
  email: Joi.string().email().message("Email is not valid").required(),
});
