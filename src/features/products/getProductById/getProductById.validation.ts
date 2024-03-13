import Joi from "joi";

export const getProductByIdValidationSchema = Joi.object({
  productId: Joi.string().required(),
});
