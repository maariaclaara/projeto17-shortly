import joi from "joi";

export const userSignUp = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  confirmPassword: joi.any().valid(joi.ref('password')).required(),
});

export const userSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
});



