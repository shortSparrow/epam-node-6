import Joi from "joi";

export const addToCartValidationSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().min(0).required(),
  userId: Joi.string().required(),
});
